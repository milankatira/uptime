'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const CreateHeartbeatPage = () => {
  const [selectedFrequency, setSelectedFrequency] = useState("day");
  const [selectedGracePeriod, setSelectedGracePeriod] = useState("minutes");
  const [notificationOptions, setNotificationOptions] = useState({
    call: false,
    sms: false,
    email: true,
    push: false,
    critical: false
  });

  const toggleNotification = (type: keyof typeof notificationOptions) => {
    setNotificationOptions(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 w-full">
      <div className="max-w-full">
        <div className="flex items-start p-6">
          <Link href="/heartbeats" className="mr-6">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Heartbeats
            </Button>
          </Link>
          <h1 className="text-xl font-medium text-white">Create heartbeat</h1>
        </div>

        <Separator className="bg-gray-800" />

        <div className="p-6 max-w-5xl mx-auto">
          <div className="space-y-12">
            <section>
              <h2 className="text-lg font-medium text-white mb-6">What to monitor</h2>
              <p className="text-gray-400 mb-2">
                Configure the name of the CRON job or a worker you want to monitor.
              </p>
              <p className="text-gray-400 mb-6">
               {` You'll find the advanced configuration below, in the advanced settings section.`}
              </p>

              <div className="space-y-6">
                <div>
                  <label className="text-xs text-gray-400 block mb-2">What service will this heartbeat track? <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded ml-1">Required</span></label>
                  <Input
                    type="text"
                    placeholder="Example: Daily database backup"
                    className="bg-gray-800 border-gray-700 text-white w-full"
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs text-gray-400 block mb-2">Expect a heartbeat every</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value="1"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <div className="relative w-full">
                        <select
                          className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white appearance-none"
                          value={selectedFrequency}
                          onChange={(e) => setSelectedFrequency(e.target.value)}
                        >
                          <option value="minute">minute</option>
                          <option value="hour">hour</option>
                          <option value="day">day</option>
                          <option value="week">week</option>
                          <option value="month">month</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-2">with a grace period of</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value="5"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <div className="relative w-full">
                        <select
                          className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white appearance-none"
                          value={selectedGracePeriod}
                          onChange={(e) => setSelectedGracePeriod(e.target.value)}
                        >
                          <option value="seconds">seconds</option>
                          <option value="minutes">minutes</option>
                          <option value="hours">hours</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium text-white mb-6">On-call escalation</h2>
              <p className="text-gray-400 mb-6">
                {`Set up rules for who's going to be notified and how when an incident occurs.`}
              </p>

              <div className="space-y-6">
                <div>
                  <label className="text-xs text-gray-400 block mb-2">{`When there's a new incident`}</label>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer ${notificationOptions.call ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => toggleNotification('call')}
                    >
                      <div className={`w-4 h-4 rounded-full border ${notificationOptions.call ? 'border-indigo-500 bg-indigo-500' : 'border-gray-600'} flex items-center justify-center`}>
                        {notificationOptions.call && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span>Call</span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer ${notificationOptions.sms ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => toggleNotification('sms')}
                    >
                      <div className={`w-4 h-4 rounded-full border ${notificationOptions.sms ? 'border-indigo-500 bg-indigo-500' : 'border-gray-600'} flex items-center justify-center`}>
                        {notificationOptions.sms && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span>SMS</span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer ${notificationOptions.email ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => toggleNotification('email')}
                    >
                      <div className={`w-4 h-4 rounded-full border ${notificationOptions.email ? 'border-indigo-500 bg-indigo-500' : 'border-gray-600'} flex items-center justify-center`}>
                        {notificationOptions.email && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span>E-mail</span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer ${notificationOptions.push ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => toggleNotification('push')}
                    >
                      <div className={`w-4 h-4 rounded-full border ${notificationOptions.push ? 'border-indigo-500 bg-indigo-500' : 'border-gray-600'} flex items-center justify-center`}>
                        {notificationOptions.push && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span>Push notification</span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer ${notificationOptions.critical ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => toggleNotification('critical')}
                    >
                      <div className={`w-4 h-4 rounded-full border ${notificationOptions.critical ? 'border-indigo-500 bg-indigo-500' : 'border-gray-600'} flex items-center justify-center`}>
                        {notificationOptions.critical && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span>Critical alert</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">the current on-call person</p>

                  <div className="space-y-4 mt-4">
                    <p className="text-gray-400 text-sm">{`If the on-call person doesn't acknowledge the incident`}</p>

                    <div className="relative w-full max-w-md">
                      <select
                        className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white appearance-none"
                      >
                        <option>Within 3 minutes, alert all other team members</option>
                        <option>Within 5 minutes, alert all other team members</option>
                        <option>Within 10 minutes, alert all other team members</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm">
                      Set up an <span className="text-indigo-400">advanced escalation policy</span> and <span className="text-indigo-400">let responders choose</span> how they want to be notified.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-400">Advanced settings</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer mt-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-400">Metadata</span>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Create heartbeat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHeartbeatPage;
