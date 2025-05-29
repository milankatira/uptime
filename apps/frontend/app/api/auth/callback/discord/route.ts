/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import url from "url";

/**
 * Processes the Discord OAuth2 callback by exchanging the authorization code for an access token, retrieving the user's guilds, and redirecting to the connections page with relevant webhook and guild details as query parameters.
 *
 * If the authorization code or token data is missing, redirects to the generic connections page without additional parameters.
 *
 * @param req - The incoming request containing the OAuth2 authorization code as a query parameter.
 * @returns A redirect response to the connections page, optionally including webhook and guild information.
 *
 * @remark Uses environment variables for Discord client credentials and hardcoded localhost URLs for redirect URIs and redirection targets.
 */
export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    if (code) {
        const data = new url.URLSearchParams();
        data.append("client_id", process.env.DISCORD_CLIENT_ID!);
        data.append("client_secret", process.env.DISCORD_CLIENT_SECRET!);
        data.append("grant_type", "authorization_code");
        data.append(
            "redirect_uri",
            "http://localhost:3000/api/auth/callback/discord",
        );
        data.append("code", code);

        const output = await axios.post(
            "https://discord.com/api/oauth2/token",
            data,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        if (output.data) {
            const access = output.data.access_token;
            const UserGuilds: any = await axios.get(
                `https://discord.com/api/users/@me/guilds`,
                {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                },
            );

            const UserGuild = UserGuilds.data.filter(
                (guild: any) => guild.id == output.data.webhook.guild_id,
            );

            const redirectUrl = `http://localhost:3000/connections?webhook_id=${output.data.webhook.id}&webhook_url=${output.data.webhook.url}&webhook_name=${output.data.webhook.name}&guild_id=${output.data.webhook.guild_id}&guild_name=${UserGuild[0].name}&channel_id=${output.data.webhook.channel_id}`;

            console.log("Redirecting to:", redirectUrl); // Log the redirect URL

            return NextResponse.redirect(redirectUrl);
        }

        console.log(
            "No output data received, redirecting to connections page.",
        ); // Log when redirecting without data
        return NextResponse.redirect("http://localhost:3000/connections");
    }
    console.log("No code received, redirecting to connections page."); // Log when no code is received
    return NextResponse.redirect("http://localhost:3000/connections");
}
