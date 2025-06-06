import { Octokit } from "@octokit/rest";
import { GoogleGenerativeAI } from "@google/generative-ai";

const token = process.env.GITHUB_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;
if (!process.env.GITHUB_REPOSITORY) {
  throw new Error('GITHUB_REPOSITORY environment variable is not defined');
}
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
if (!process.env.GITHUB_REF) {
  throw new Error('GITHUB_REF environment variable is not defined');
}
const prNumber = process.env.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/)?.[1];
if (!prNumber) {
  throw new Error('Could not extract PR number from GITHUB_REF');
}

const octokit = new Octokit({ auth: token });
if (!geminiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not defined');
}
const genAI = new GoogleGenerativeAI(geminiKey);

async function main() {
  const { data: files } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: Number(prNumber),
  });

  const diffs = files
    .filter((f) => f.filename.endsWith(".js"))
    .map((f) => `### ${f.filename}\n\`\`\`diff\n${f.patch}\n\`\`\``)
    .join("\n");

  const prompt = `You are a code review assistant. Analyze the following code changes and provide suggestions:\n\n${diffs}`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const review = result.response.text();

  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: Number(prNumber),
    body: `🧠 **AI Code Review Suggestions**\n\n${review}`,
  });
}

main().catch((err) => {
  console.error("Review failed:", err);
  process.exit(1);
});
