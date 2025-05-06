'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

const HeartbeatsPage = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const heartbeats = [
    {
      id: 1,
      url: "https://milankatira.vercel.app/",
      status: "Pending",
      time: "15h 3m",
      lastChecked: "1d"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 w-full">
      <div className="max-w-full p-6 md:p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold text-white">
            Heartbeats <span className="text-gray-400 text-sm ml-1">1</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                className="bg-gray-800 border-gray-700 text-white pl-9 w-[300px]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">/</div>
            </div>
            <Link href="/heartbeats/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Create heartbeat
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
          <div
            className="flex items-center px-6 py-4 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <svg
              className={`h-4 w-4 text-gray-400 mr-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span className="text-white">Heartbeats</span>
          </div>

          {isExpanded && (
            <div className="border-t border-gray-700">
              {heartbeats.map((heartbeat) => (
                <div key={heartbeat.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-700/30">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-400 mr-4"></div>
                    <div>
                      <div className="text-white text-sm">{heartbeat.url}</div>
                      <div className="text-gray-400 text-xs mt-1">{heartbeat.status} · {heartbeat.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-400 text-sm mr-2">
                      <span className="inline-flex items-center">
                        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
                        </svg>
                        {heartbeat.lastChecked}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
