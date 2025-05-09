'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BACKEND_URL } from "@/config";
import { useAxiosInstance } from "@/lib/axiosInstance";

const CreateHeartbeatPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [intervalValue, setIntervalValue] = useState(1);
  const [gracePeriodValue, setGracePeriodValue] = useState(5);
  const [selectedFrequency, setSelectedFrequency] = useState("day");
  const [selectedGracePeriod, setSelectedGracePeriod] = useState("minutes");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const instance = useAxiosInstance();

  const handleSubmit = async () => {
    if (!name || !intervalValue || !gracePeriodValue) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await instance.post(`${API_BACKEND_URL}/api/v1/heartbeat`, {
        name,
        interval: intervalValue,
        gracePeriod: gracePeriodValue,
      });

      router.push("/heartbeats"); // Redirect to heartbeats list on success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to create heartbeat.");
    } finally {
      setLoading(false);
    }
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

        <div className="p-6 max-w-5xl mx-auto space-y-6">
          <section>
            <label className="text-xs text-gray-400 block mb-2">Name <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded ml-1">Required</span></label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Daily database backup"
              className="bg-gray-800 border-gray-700 text-white w-full"
            />
          </section>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="text-xs text-gray-400 block mb-2">Expect a heartbeat every</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={intervalValue}
                  onChange={(e) => setIntervalValue(Number(e.target.value))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <select
                  className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
                  value={selectedFrequency}
                  onChange={(e) => setSelectedFrequency(e.target.value)}
                >
                  <option value="minute">minute</option>
                  <option value="hour">hour</option>
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-2">with a grace period of</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={gracePeriodValue}
                  onChange={(e) => setGracePeriodValue(Number(e.target.value))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <select
                  className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
                  value={selectedGracePeriod}
                  onChange={(e) => setSelectedGracePeriod(e.target.value)}
                >
                  <option value="seconds">seconds</option>
                  <option value="minutes">minutes</option>
                  <option value="hours">hours</option>
                </select>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Heartbeat"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateHeartbeatPage;
