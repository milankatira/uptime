"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { API_BACKEND_URL } from "@/config";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateHeartbeatPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [intervalValue, setIntervalValue] = useState(1);
  const [gracePeriodValue, setGracePeriodValue] = useState(5);
  const [selectedFrequency, setSelectedFrequency] = useState("day");
  const [selectedGracePeriod, setSelectedGracePeriod] = useState("minutes");
  const [escalation, setEscalation] = useState({
    call: false,
    sms: false,
    email: true,
    push: false,
    critical: false,
    fallback: "Within 3 minutes, alert all other team members",
  });
  const [maintenance, setMaintenance] = useState({
    days: [],
    start: "",
    end: "",
    timezone: "GMT+00:00",
  });
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
        metadata: Object.fromEntries(
          metadata.filter((m) => m.key).map((m) => [m.key, m.value]),
        ),
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
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <div className="max-w-full">
        <div className="flex items-start p-6">
          <Link href="/heartbeats" className="mr-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Heartbeats
            </Button>
          </Link>
          <h1 className="text-xl font-medium text-white">Create heartbeat</h1>
        </div>

        <Separator className="bg-gray-800" />

        <div className="mx-auto max-w-5xl space-y-6 p-6">
          <section>
            <label className="mb-2 block text-xs text-gray-400">
              Name{" "}
              <span className="ml-1 rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                Required
              </span>
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Daily database backup"
              className="w-full"
            />
          </section>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="mb-2 block text-xs text-gray-400">
                Expect a heartbeat every
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={intervalValue}
                  onChange={(e) => setIntervalValue(Number(e.target.value))}
                  className="w-20"
                />
                <Select
                  value={selectedFrequency}
                  onValueChange={setSelectedFrequency}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minute">minute</SelectItem>
                    <SelectItem value="hour">hour</SelectItem>
                    <SelectItem value="day">day</SelectItem>
                    <SelectItem value="week">week</SelectItem>
                    <SelectItem value="month">month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs text-gray-400">
                with a grace period of
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={gracePeriodValue}
                  onChange={(e) => setGracePeriodValue(Number(e.target.value))}
                  className="w-20"
                />
                <Select
                  value={selectedGracePeriod}
                  onValueChange={setSelectedGracePeriod}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Grace period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">seconds</SelectItem>
                    <SelectItem value="minutes">minutes</SelectItem>
                    <SelectItem value="hours">hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <section className="mt-8">
            <h2 className="text-md mb-2 font-semibold text-white">
              On-call escalation
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                {[
                  "Call",
                  "SMS",
                  "E-mail",
                  "Push notification",
                  "Critical alert",
                ].map((type, idx) => (
                  <label
                    key={type}
                    className="flex items-center gap-1 text-sm text-gray-300"
                  >
                    <Checkbox
                      checked={Object.values(escalation)[idx] as boolean}
                      onCheckedChange={(checked) =>
                        setEscalation((e) => ({
                          ...e,
                          [Object.keys(e)[idx]]: checked,
                        }))
                      }
                    />
                    {type}
                  </label>
                ))}
              </div>
              <Select
                value={escalation.fallback}
                onValueChange={(value) =>
                  setEscalation((es) => ({ ...es, fallback: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select fallback option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Within 3 minutes, alert all other team members">
                    Within 3 minutes, alert all other team members
                  </SelectItem>
                  <SelectItem value="Within 5 minutes, alert all other team members">
                    Within 5 minutes, alert all other team members
                  </SelectItem>
                  <SelectItem value="Do not escalate">
                    Do not escalate
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
          <details className="mt-8">
            <summary className="text-md cursor-pointer font-semibold text-white">
              Advanced settings
            </summary>
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-300">
                Maintenance
              </h3>
              <div className="mb-2 flex items-center gap-2">
                <label className="text-xs text-gray-400">
                  Maintenance window between
                </label>
                <Input
                  type="time"
                  value={maintenance.start}
                  onChange={(e) =>
                    setMaintenance((m) => ({ ...m, start: e.target.value }))
                  }
                  className="w-28 border-gray-700 bg-gray-800 text-white"
                />
                <span className="text-gray-400">-</span>
                <Input
                  type="time"
                  value={maintenance.end}
                  onChange={(e) =>
                    setMaintenance((m) => ({ ...m, end: e.target.value }))
                  }
                  className="w-28 border-gray-700 bg-gray-800 text-white"
                />
                <select
                  value={maintenance.timezone}
                  onChange={(e) =>
                    setMaintenance((m) => ({ ...m, timezone: e.target.value }))
                  }
                  className="ml-2 border-gray-700 bg-gray-800 text-white"
                >
                  <option>GMT+00:00</option>
                  <option>GMT+01:00</option>
                  <option>GMT-05:00</option>
                </select>
              </div>
              <div className="mt-2 flex gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <button
                      key={day}
                      type="button"
                      className={`rounded px-3 py-1 ${maintenance.days.includes(day as never) ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                      onClick={() =>
                        setMaintenance((m) => ({
                          ...(m as {
                            days: string[];
                            start: string;
                            end: string;
                            timezone: string;
                          }),
                          days: m.days.includes(day as never)
                            ? (m.days.filter((d) => d !== day) as never[])
                            : ([...m.days, day] as never[]),
                        }))
                      }
                    >
                      {day}
                    </button>
                  ),
                )}
              </div>
            </div>
          </details>
          <details className="mt-8">
            <summary className="text-md cursor-pointer font-semibold text-white">
              Metadata
            </summary>
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-300">
                Metadata
              </h3>
              {metadata.map((pair, idx) => (
                <div key={idx} className="mb-2 flex gap-2">
                  <Input
                    placeholder="Key"
                    value={pair.key}
                    onChange={(e) =>
                      setMetadata((md) =>
                        md.map((p, i) =>
                          i === idx ? { ...p, key: e.target.value } : p,
                        ),
                      )
                    }
                    className="border-gray-700 bg-gray-800 text-white"
                  />
                  <Input
                    placeholder="Value"
                    value={pair.value}
                    onChange={(e) =>
                      setMetadata((md) =>
                        md.map((p, i) =>
                          i === idx ? { ...p, value: e.target.value } : p,
                        ),
                      )
                    }
                    className="border-gray-700 bg-gray-800 text-white"
                  />
                  <button
                    type="button"
                    className="text-red-400"
                    onClick={() =>
                      setMetadata((md) => md.filter((_, i) => i !== idx))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 text-blue-400"
                onClick={() =>
                  setMetadata((md) => [...md, { key: "", value: "" }])
                }
              >
                Add Metadata
              </button>
            </div>
          </details>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <Button onClick={handleSubmit} disabled={loading} className="mt-4">
            {loading ? "Creating..." : "Create Heartbeat"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateHeartbeatPage;
