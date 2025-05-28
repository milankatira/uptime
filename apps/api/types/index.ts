export enum IncidentStatus {
  Ongoing = "Ongoing",
  Resolved = "Resolved",
}

export interface SlackAuthInfo {
  appId: string;
  authedUserId: string;
  authedUserToken: string;
  slackAccessToken: string;
  botUserId: string;
  teamId: string;
  teamName: string;
}

export interface DiscordAuthInfo {
  channelId: string;
  webhookId: string;
  webhookName: string;
  webhookUrl: string;
  guildName: string;
  guildId: string;
}
