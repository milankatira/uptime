"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HeartbeatsPage = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const heartbeats = [
    {
      id: 1,
      url: "https://milankatira.vercel.app/",
      status: "Pending",
      time: "15h 3m",
      lastChecked: "1d",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div className="max-w-full p-6 md:p-8">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">
            Heartbeats <span className="ml-1 text-sm text-gray-400">1</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                className="w-[300px] border-gray-700 bg-gray-800 pl-9 text-white"
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-500">
                /
              </div>
            </div>
            <Link href="/heartbeats/create">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                Create heartbeat
              </Button>
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50">
          <div
            className="flex cursor-pointer items-center px-6 py-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <svg
              className={`mr-2 h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="text-white">Heartbeats</span>
          </div>

          {isExpanded && (
            <div className="border-t border-gray-700">
              {heartbeats.map((heartbeat) => (
                <div
                  key={heartbeat.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-700/30"
                >
                  <div className="flex items-center">
                    <div className="mr-4 h-2 w-2 rounded-full bg-gray-400"></div>
                    <div>
                      <div className="text-sm text-white">{heartbeat.url}</div>
                      <div className="mt-1 text-xs text-gray-400">
                        {heartbeat.status} · {heartbeat.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 text-sm text-gray-400">
                      <span className="inline-flex items-center">
                        <svg
                          className="mr-1 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M12 6v6l4 2"
                          />
                        </svg>
                        {heartbeat.lastChecked}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartbeatsPage;
