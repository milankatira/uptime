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
  const [escalation, setEscalation] = useState({ call: false, sms: false, email: true, push: false, critical: false, fallback: "Within 3 minutes, alert all other team members" });
  const [maintenance, setMaintenance] = useState({ days: [], start: "", end: "", timezone: "GMT+00:00" });
  const [metadata, setMetadata] = useState([{ key: "", value: "" }]);
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
        escalation,
        maintenance,
        metadata: Object.fromEntries(metadata.filter(m => m.key).map(m => [m.key, m.value]))
      });
      router.push("/heartbeats");

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
          <section className="mt-8">
            <h2 className="text-md font-semibold text-white mb-2">On-call escalation</h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                {['Call', 'SMS', 'E-mail', 'Push notification', 'Critical alert'].map((type, idx) => (
                  <label key={type} className="flex items-center gap-1 text-gray-300 text-sm">
                    <input type="checkbox" checked={Object.values(escalation)[idx] as boolean} onChange={() => setEscalation(e => ({ ...e, [Object.keys(e)[idx]]: !Object.values(e)[idx] }))} />
                    {type}
                  </label>
                ))}
              </div>
              <select className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white mt-2" value={escalation.fallback} onChange={e => setEscalation(es => ({ ...es, fallback: e.target.value }))}>
                <option>Within 3 minutes, alert all other team members</option>
                <option>Within 5 minutes, alert all other team members</option>
                <option>Do not escalate</option>
              </select>
            </div>
          </section>
          <details className="mt-8" open>
            <summary className="text-md font-semibold text-white cursor-pointer">Advanced settings</summary>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Maintenance</h3>
              <div className="flex gap-2 items-center mb-2">
                <label className="text-xs text-gray-400">Maintenance window between</label>
                <Input type="time" value={maintenance.start} onChange={e => setMaintenance(m => ({ ...m, start: e.target.value }))} className="bg-gray-800 border-gray-700 text-white w-28" />
                <span className="text-gray-400">-</span>
                <Input type="time" value={maintenance.end} onChange={e => setMaintenance(m => ({ ...m, end: e.target.value }))} className="bg-gray-800 border-gray-700 text-white w-28" />
                <select value={maintenance.timezone} onChange={e => setMaintenance(m => ({ ...m, timezone: e.target.value }))} className="bg-gray-800 border-gray-700 text-white ml-2">
                  <option>GMT+00:00</option>
                  <option>GMT+01:00</option>
                  <option>GMT-05:00</option>
                </select>
              </div>
              <div className="flex gap-2 mt-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <button
                    key={day}
                    type="button"
                    className={`px-3 py-1 rounded ${maintenance.days.includes(day as never) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setMaintenance(m => ({
                      ...m as { days: string[]; start: string; end: string; timezone: string },
                      days: m.days.includes(day as never) ? m.days.filter(d => d !== day) as never[] : [...m.days, day] as never[]
                    }))}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </details>
          <details className="mt-8">
            <summary className="text-md font-semibold text-white cursor-pointer">Metadata</summary>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Metadata</h3>
              {metadata.map((pair, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input placeholder="Key" value={pair.key} onChange={e => setMetadata(md => md.map((p, i) => i === idx ? { ...p, key: e.target.value } : p))} className="bg-gray-800 border-gray-700 text-white" />
                  <Input placeholder="Value" value={pair.value} onChange={e => setMetadata(md => md.map((p, i) => i === idx ? { ...p, value: e.target.value } : p))} className="bg-gray-800 border-gray-700 text-white" />
                  <button type="button" className="text-red-400" onClick={() => setMetadata(md => md.filter((_, i) => i !== idx))}>Remove</button>
                </div>
              ))}
              <button type="button" className="text-blue-400 mt-2" onClick={() => setMetadata(md => [...md, { key: "", value: "" }])}>Add Metadata</button>
            </div>
          </details>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button onClick={handleSubmit} disabled={loading} className="mt-4">
            {loading ? "Creating..." : "Create Heartbeat"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateHeartbeatPage;
