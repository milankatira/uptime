"use client"
import React, { useState, useEffect } from "react";
import { Maximize, BellOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Service = {
  name: string;
  url: string;
  status: "Operational" | "Degraded" | "Outage";
  uptime: number;
};

function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setCountdown((prev) => (prev > 0 ? prev - 1 : 50));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toTimeString().substring(0, 8);
  };

  const services: Service[] = [
    {
      name: "milankatira.vercel.app/",
      url: "milankatira.vercel.app/",
      status: "Operational",
      uptime: 100,
    },
  ];

  return (
    <div className="min-h-screen bg-dark w-full bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Status page</h1>
          <div className="text-right">
            <h2 className="text-2xl font-medium mb-1">Service status</h2>
            <p className="text-sm text-muted-foreground">
              Last updated {formatTime(currentTime)} | Next update in {countdown} sec.
            </p>
          </div>
        </div>

        {/* System Status Card */}
        <Card className="mb-8 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-medium mr-2">All systems</span>
              <span className="text-2xl font-medium text-green-500">Operational</span>
            </div>
          </div>
        </Card>

        {/* Services Section */}
        <h2 className="text-2xl font-bold mb-4">Services</h2>
        <Card className="p-6 rounded-lg shadow-lg">
          {services.map((service, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="font-medium mr-2">{service.name}</span>
                  <span className="text-sm text-muted-foreground">→ {service.uptime.toFixed(2)}%</span>
                </div>
                <Badge className="bg-green-500 text-white border-0">
                  {service.status}
                </Badge>
              </div>
              <div className="h-8">
                <Progress
                  value={service.uptime}
                  className="h-2"
                  style={{
                    background: "repeating-linear-gradient(90deg, #70809050 0px, #70809050 10px, #6070809050 10px, #70809050 20px)",
                  }}
                />
                <div className="h-1 w-full mt-1 bg-transparent relative">
                  <div
                    className="absolute right-0 top-0 h-2 bg-green-500"
                    style={{ width: '1%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Footer */}
        <div className="mt-12 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-white">
              <Maximize size={18} />
              <span>Fullscreen mode</span>
            </button>
            <button className="flex items-center gap-2 hover:text-white">
              <BellOff size={18} />
              <span>Alert sound off</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-white">Privacy policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <span className="ml-2">Status page by</span>
            <span className="text-white font-medium">UptimeRobot</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPage;

