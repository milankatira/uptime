"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { useAxiosInstance } from "@/lib/axiosInstance";

type Props = {
    searchParams?: { [key: string]: string | undefined };
};

const Page = (props: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const instance = useAxiosInstance();

    const {
        app_id = "",
        authed_user_id = "",
        authed_user_token = "",
        slack_access_token = "",
        bot_user_id = "",
        team_id = "",
        team_name = "",
        channel_id = "",
        webhook_id = "",
        webhook_name = "",
        webhook_url = "",
        guild_name = "",
        guild_id,
    } = props.searchParams || {};

    useEffect(() => {
        const connectAccounts = async () => {
            try {
                if (
                    app_id ||
                    authed_user_id ||
                    authed_user_token ||
                    slack_access_token ||
                    bot_user_id ||
                    team_id ||
                    team_name
                ) {
                    await instance.post("/api/v1/connections/slack", {
                        appId: app_id,
                        authedUserId: authed_user_id,
                        authedUserToken: authed_user_token,
                        slackAccessToken: slack_access_token,
                        botUserId: bot_user_id,
                        teamId: team_id,
                        teamName: team_name,
                    });
                }

                if (
                    channel_id ||
                    webhook_id ||
                    webhook_name ||
                    webhook_url ||
                    guild_name ||
                    guild_id
                ) {
                    await instance.post("/api/v1/connections/discord", {
                        channelId: channel_id,
                        webhookId: webhook_id,
                        webhookName: webhook_name,
                        webhookUrl: webhook_url,
                        guildName: guild_name,
                        guildId: guild_id,
                    });
                }

                toast("Your accounts have been successfully connected!");

                router.push("/integrations-api");
            } catch (error) {
                toast(
                    "There was an error connecting your accounts. Please try again.",
                );

                console.error("Failed to connect accounts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        connectAccounts();
    }, [
        app_id,
        authed_user_id,
        authed_user_token,
        slack_access_token,
        bot_user_id,
        team_id,
        team_name,
        channel_id,
        webhook_id,
        webhook_name,
        webhook_url,
        guild_name,
        guild_id,
        instance,
        router,
    ]);

    if (isLoading) {
        return (
            <div className="flex w-full flex-1 items-center justify-center h-screen px-4">
                <div className="relative z-10 flex -translate-y-1/2 flex-col items-center gap-6 text-center">
                    <LoadingSpinner size="md" />
                    <h1>Connecting your accounts...</h1>
                    <p className="text-base/7 text-gray-600 max-w-prose">
                        Please wait while we connect your accounts.
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

export default Page;
