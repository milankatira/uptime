"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React, { useMemo } from "react";

interface WebsiteTick {
  id: string;
  createdAt: string;
  status: string;
  latency: number;
}

interface ResponseTimeChartProps {
    ticks: WebsiteTick[];
}

// Define chart configuration for latency
const chartConfig = {
    latency: {
        label: "Latency (ms)",
        color: "hsl(var(--chart-1))", // Use a suitable color variable
    },
} satisfies ChartConfig;

export function ResponseTimeChart({ ticks }: ResponseTimeChartProps) {

    // Prepare data for the chart (e.g., latency over time)
    const chartData = useMemo(() => {
        return ticks
            .map(tick => ({
                // Use a more precise time format for the x-axis if needed, or just index
                // For simplicity, using timestamp here for sorting, and then format for display
                time: new Date(tick.createdAt).getTime(),
                latency: tick.latency,
                status: tick.status,
            }))
            .sort((a, b) => a.time - b.time) // Sort by time
            .map(tick => ({
                ...tick,
                // Format time for display after sorting
                displayTime: new Date(tick.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }));
    }, [ticks]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Response Time Chart</CardTitle>
                <CardDescription>Latency over time.</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length > 0 ? (
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="displayTime" // Use 'displayTime' for the x-axis labels
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                // tickFormatter is now handled by preparing displayTime in chartData
                            />
                            <YAxis
                                dataKey="latency"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }} // Add Y-axis label
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Area
                                dataKey="latency"
                                type="natural"
                                fill="var(--color-latency)"
                                fillOpacity={0.4}
                                stroke="var(--color-latency)"
                            />
                        </AreaChart>
                    </ChartContainer>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        No data available to display the chart.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}