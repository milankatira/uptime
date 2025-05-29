"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { API_BACKEND_URL } from "@/config";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Displays and manages maintenance windows, allowing users to schedule, view, and repeat maintenance periods.
 *
 * Provides a UI for creating new maintenance windows by selecting a date, time slot, and optional repeat frequency. Fetches and displays upcoming maintenance windows from the backend. Handles loading and submission states, and notifies users of errors during creation.
 */
function MaintenanceWindow() {
    const [showDialog, setShowDialog] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
        null,
    );
    const [repeat, setRepeat] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [windows, setWindows] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const instance = useAxiosInstance();

    // Fetch maintenance windows
    useEffect(() => {
        setLoading(true);
        instance
            .get(`${API_BACKEND_URL}/api/v1/maintenance-windows`)
            .then((res) => setWindows(res.data.windows || []))
            .catch(() => setWindows([]))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDialog]);

    // Sample time slots
    const timeSlots = [
        "00:00 - 02:00",
        "02:00 - 04:00",
        "04:00 - 06:00",
        "06:00 - 08:00",
        "08:00 - 10:00",
        "10:00 - 12:00",
        "12:00 - 14:00",
        "14:00 - 16:00",
        "16:00 - 18:00",
        "18:00 - 20:00",
        "20:00 - 22:00",
        "22:00 - 00:00",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await instance.post(
                `${API_BACKEND_URL}/api/v1/maintenance-window`,
                {
                    date: date?.toISOString(),
                    timeSlot: selectedTimeSlot,
                    repeat: repeat || null,
                },
            );
            setShowDialog(false);
            setDate(undefined);
            setSelectedTimeSlot(null);
            setRepeat("");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to create maintenance window");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-gray-900">
            {/* Background decorative circles */}

            <div className="relative z-10 mx-auto max-w-full px-4 py-10 sm:px-6">
                <h1 className="mb-10 text-2xl font-bold text-white">
                    Maintenance windows.
                </h1>

                <div className="mt-14">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-bold text-white">
                                Plan your{" "}
                                <span className="text-green-500">
                                    maintenance.
                                </span>
                            </h2>

                            <p className="mt-6 leading-relaxed text-gray-300">
                                Unlock seamless maintenance planning! Keep your
                                uptime untouched with scheduled regular or
                                unplanned maintenance. During maintenance
                                windows, no alerts are sent.
                            </p>

                            <div className="mt-8">
                                <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                                    See plans
                                </Button>
                                <span className="ml-4 text-sm text-gray-400">
                                    Plans start at $7 / month. 10-day money-back
                                    guarantee included!
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 lg:mt-0 lg:w-fit">
                            <Button
                                className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                                onClick={() => setShowDialog(true)}
                            >
                                Create Maintenance window
                            </Button>
                        </div>
                    </div>

                    {/* Upcoming Maintenance Windows */}
                    <div className="mt-16">
                        <h2 className="mb-6 text-xl font-semibold text-white">
                            Upcoming Maintenance Windows
                        </h2>
                        {loading ? (
                            <div className="text-gray-400">Loading...</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {windows.length === 0 && (
                                    <div className="text-gray-400">
                                        No upcoming maintenance windows.
                                    </div>
                                )}
                                {windows.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-lg border border-gray-700 bg-gray-800/60 p-5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-green-500">
                                                Scheduled
                                            </span>
                                        </div>
                                        <div className="mt-3">
                                            <div className="mb-2 flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4 text-indigo-400" />
                                                <span className="text-white">
                                                    {item.date
                                                        ? format(
                                                              new Date(
                                                                  item.date,
                                                              ),
                                                              "PPP",
                                                          )
                                                        : "-"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-indigo-400" />
                                                <span className="text-white">
                                                    {item.timeSlot}
                                                </span>
                                            </div>
                                        </div>
                                        {item.repeat && (
                                            <div className="mt-2 text-xs text-gray-400">
                                                Repeats: {item.repeat}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="border border-gray-800 bg-gray-900 text-white sm:max-w-md">
                    <DialogHeader className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-green-800/30 p-1">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-green-500"
                                >
                                    <path
                                        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <DialogTitle className="text-lg">
                                Create{" "}
                                <span className="text-green-500">
                                    Maintenance
                                </span>{" "}
                                window
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <form className="mt-2 space-y-5" onSubmit={handleSubmit}>
                        <div className="m-auto w-full items-center justify-center">
                            <label className="mb-2 block text-sm font-medium text-gray-400">
                                Select Date
                            </label>

                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="borde m-auto w-full rounded-md"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-400">
                                Select Time Slot
                            </label>
                            <div className="grid max-h-60 grid-cols-3 gap-2 overflow-y-auto">
                                {timeSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        type="button"
                                        className={cn(
                                            "rounded-md border px-3 py-2 text-sm",
                                            selectedTimeSlot === slot
                                                ? "border-indigo-500 bg-indigo-600 text-white"
                                                : "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700",
                                        )}
                                        onClick={() =>
                                            setSelectedTimeSlot(slot)
                                        }
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-400">
                                Repeat
                            </label>
                            <select
                                className="w-full appearance-none rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                                value={repeat}
                                onChange={(e) => setRepeat(e.target.value)}
                            >
                                <option value="">No repeat</option>
                                <option value="weekly">Repeat weekly</option>
                                <option value="monthly">Repeat monthly</option>
                                <option value="daily">Repeat daily</option>
                            </select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                            disabled={submitting || !date || !selectedTimeSlot}
                        >
                            {submitting ? "Creating..." : "Create window"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MaintenanceWindow;
