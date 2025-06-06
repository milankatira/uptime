const { Octokit } = require("@octokit/rest");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { execSync } = require("child_process");

const token = process.env.GITHUB_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const prNumber = process.env.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/)[1];

const octokit = new Octokit({ auth: token });
const genAI = new GoogleGenerativeAI(geminiKey);

async function main() {
  const { data: files } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: prNumber,
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
    issue_number: prNumber,
    body: `🧠 **AI Code Review Suggestions**\n\n${review}`,
  });
}

main().catch((error) => {
  console.error("Review failed:", error.message);
  process.exit(1);
});
