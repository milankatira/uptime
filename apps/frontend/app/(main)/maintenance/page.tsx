'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X, CalendarIcon, Clock } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function MaintenanceWindow() {
  const [showDialog, setShowDialog] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

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
    "22:00 - 00:00"
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative overflow-hidden w-full">
      {/* Background decorative circles */}

      <div className="max-w-full mx-auto py-10 px-4 sm:px-6 relative z-10">
        <h1 className="text-2xl font-bold text-white mb-10">Maintenance windows.</h1>

        <div className="mt-14">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-white">
                Plan your <span className="text-green-500">maintenance.</span>
              </h2>

              <p className="mt-6 text-gray-300 leading-relaxed">
                Unlock seamless maintenance planning! Keep your uptime untouched with scheduled regular or unplanned maintenance. During maintenance windows, no alerts are sent.
              </p>

              <div className="mt-8">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  See plans
                </Button>
                <span className="ml-4 text-sm text-gray-400">
                  Plans start at $7 / month. 10-day money-back guarantee included!
                </span>
              </div>
            </div>

            <div className="lg:w-fit mt-10 lg:mt-0">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
                onClick={() => setShowDialog(true)}
              >
                Create Maintenance window
              </Button>
            </div>
          </div>

          {/* Upcoming Maintenance Windows */}
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-white mb-6">Upcoming Maintenance Windows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-green-500 text-sm font-medium">Scheduled</span>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon className="h-4 w-4 text-indigo-400" />
                      <span className="text-white">May 10, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-400" />
                      <span className="text-white">10:00 - 12:00</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-sm text-gray-400">Services affected:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">API</span>
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Dashboard</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-800 text-white">
          <DialogHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-green-800/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <DialogTitle className="text-lg">Create <span className="text-green-500">Maintenance</span> window</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="space-y-5 mt-2">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full bg-gray-800 border-gray-700 text-left flex justify-between items-center",
                      !date && "text-gray-400"
                    )}
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </div>
                    <div className="text-gray-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="bg-gray-800 text-white pointer-events-auto"
                    classNames={{
                      month: "text-white",
                      caption_label: "text-white",
                      day_selected: "bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-700",
                      day_today: "bg-gray-700 text-white",
                      day: "text-gray-300 hover:bg-gray-700 focus:bg-gray-700"
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    className={cn(
                      "px-3 py-2 text-sm rounded-md border",
                      selectedTimeSlot === slot
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    )}
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Repeat
              </label>
              <div className="relative">
                <select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white appearance-none">
                  <option>Repeat weekly</option>
                  <option>Repeat monthly</option>
                  <option>Repeat daily</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Days in week to repeat
              </label>
              <ToggleGroup type="multiple" className="flex gap-2">
                <ToggleGroupItem value="sun" className="w-9 h-9 rounded-full bg-indigo-600 data-[state=on]:bg-indigo-600 data-[state=off]:bg-gray-700">S</ToggleGroupItem>
                <ToggleGroupItem value="mon" className="w-9 h-9 rounded-full data-[state=on]:bg-indigo-600 data-[state=off]:bg-gray-700">M</ToggleGroupItem>
                <ToggleGroupItem value="tue" className="w-9 h-9 rounded-full data-[state=on]:bg-indigo-600 data-[state=off]:bg-gray-700">T</ToggleGroupItem>
                <ToggleGroupItem value="wed" className="w-9 h-9 rounded-full data-[state=on]:bg-indigo-600 data-[state=off]:bg-gray-700">W</ToggleGroupItem>
                <ToggleGroupItem value="thu" className="w-9 h-9 rounded-full data-[state=on]:bg-indigo-600 data-[state=off]:bg-gray-700">T</ToggleGroupItem>
                <ToggleGroupItem value="fri" className="w-9 h-9 rounded-full data-[state=on]:bg-indigo-600 data-[state=off]:bg-gray-700">F</ToggleGroupItem>
                <ToggleGroupItem value="sat" className="w-9 h-9 rounded-full data-[state=on]:bg-indigo-600 data-[state=off]:bg-gray-700">S</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Duration of maintenance
              </label>
              <div className="flex">
                <Input type="number" className="bg-gray-800 border-gray-700 text-white rounded-r-none" />
                <span className="inline-flex items-center px-3 bg-gray-700 border border-l-0 border-gray-700 rounded-r-md text-gray-400">
                  minutes
                </span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="w-1/2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white">
                Create window
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MaintenanceWindow;
