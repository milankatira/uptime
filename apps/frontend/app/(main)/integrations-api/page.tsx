import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slack, MessageCircle, AlertCircle, Webhook } from "lucide-react";

function IntegrationsSection() {
  const integrations = [
    {
      id: "slack",
      name: "Slack",
      description: "Slack messages are a great way to inform the entire team of a downtime.",
      icon: <Slack className="h-8 w-8 text-white" />,
      available: true,
      plans: ["Solo", "Team", "Enterprise"]
    },
    {
      id: "telegram",
      name: "Telegram",
      description: "Telegram messages are a great way how to stay alerted.",
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      available: true,
      plans: ["Solo", "Team", "Enterprise"]
    },
    {
      id: "webhook",
      name: "Webhook",
      description: "For advanced alerting you can setup webhooks to your own system or app.",
      icon: <Webhook className="h-8 w-8 text-white" />,
      available: true,
      plans: ["Team", "Enterprise"]
    },
    {
      id: "discord",
      name: "Discord",
      description: "Get important monitor status updates in your Discord messages.",
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      available: false,
      plans: []
    },
    {
      id: "mattermost",
      name: "Mattermost",
      description: "Get status update on your Mattermost.",
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      available: true,
      plans: ["Solo", "Team", "Enterprise"]
    },
    {
      id: "msteams",
      name: "MS Teams",
      description: "Get notifications inside your MS Teams app to alert everyone in the group.",
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      available: true,
      plans: ["Solo", "Team", "Enterprise"]
    },
    {
      id: "googlechat",
      name: "Google Chat",
      description: "Get notifications into the Google Chat. Just copy the space URL to UptimeRobot.",
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      available: false,
      plans: []
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Integrate your Zapier account to get alerted right away.",
      icon: <AlertCircle className="h-8 w-8 text-white" />,
      available: true,
      plans: ["Team", "Enterprise"]
    },
    {
      id: "pagerduty",
      name: "PagerDuty",
      description: "Send up & down events and auto-resolve your incidents in PagerDuty.",
      icon: <AlertCircle className="h-8 w-8 text-white" />,
      available: true,
      plans: ["Team", "Enterprise"]
    }
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-full min-h-screen p-6 md:p-10">
      <h2 className="text-2xl font-semibold text-white mb-8">Integrations.</h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-48 lg:w-64 space-y-4">
          <div className="p-2 bg-indigo-900/20 text-white rounded-md">All</div>
          <div className="p-2 text-gray-400 hover:bg-gray-800/50 rounded-md">Chat platforms</div>
          <div className="p-2 text-gray-400 hover:bg-gray-800/50 rounded-md">Webhooks</div>
          <div className="p-2 text-gray-400 hover:bg-gray-800/50 rounded-md">Connectors & Incident management</div>
          <div className="p-2 text-gray-400 hover:bg-gray-800/50 rounded-md">Push notifications</div>
          <div className="p-2 text-gray-400 hover:bg-gray-800/50 rounded-md">API</div>
        </div>

        <div className="flex-1">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <Input
              type="search"
              placeholder="Search by integration type..."
              className="pl-10 bg-gray-900 border-gray-700 text-gray-300 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="p-5 bg-gray-900/80 border border-gray-800 rounded-lg">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg">
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{integration.name}</h3>
                      <p className="text-sm text-gray-400">{integration.description}</p>
                    </div>
                  </div>

                  {integration.available ? (
                    <div className="flex items-center">
                      <div className="text-amber-500 flex items-center gap-1 text-sm">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span>Available only in </span>
                        {integration.plans.map((plan, i) => (
                          <span key={plan}>
                            {i > 0 && ", "}
                            <span className="font-medium">{plan}</span>
                          </span>
                        ))}
                      </div>
                      <Button variant="link" className="text-indigo-400 hover:text-indigo-300">
                        Upgrade now
                      </Button>
                    </div>
                  ) : (
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      <span className="mr-2">+</span> Add
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default IntegrationsSection;