"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import React, { useMemo } from "react";

interface AveragedTick {
    windowStart: string;
    avgLatency: number;
    status: "Good" | "Bad";
}

interface ResponseTimeChartProps {
    averagedTicks: AveragedTick[];
}

// Define chart configuration for latency
const chartConfig = {
    latency: {
        label: "Latency (ms)",
        color: "hsl(var(--chart-1))", // Use a suitable color variable
    },
} satisfies ChartConfig;

/**
 * Displays an area chart visualizing website latency over time using 3-minute averages.
 *
 * Renders a responsive chart of latency measurements using pre-aggregated data. If no data is available, shows a fallback message.
 *
 * @param averagedTicks - Array of pre-aggregated latency data in 3-minute windows
 */
export function ResponseTimeChart({ averagedTicks }: ResponseTimeChartProps) {
    // Prepare data for the chart using 3-minute windows
    const chartData = useMemo(() => {
        return averagedTicks
            .map((tick) => {
                const time = new Date(tick.windowStart).getTime();
                return {
                    time,
                    latency: tick.avgLatency,
                    status: tick.status,
                    // Format time for display
                    displayTime: new Date(time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                };
            })
            .sort((a, b) => a.time - b.time); // Sort chronologically
    }, [averagedTicks]);

    return (
        <Card className="bg-white dark:bg-gray-900 mb-5">
            <CardHeader>
                <CardTitle>Response Time (3-min averages)</CardTitle>
                <CardDescription>
                    Latency over time grouped in 3-minute windows
                </CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className="min-h-[300px] w-full"
                    >
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{ left: 12, right: 12 }}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="displayTime"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={20}
                            />
                            <YAxis
                                dataKey="latency"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                label={{
                                    value: "Latency (ms)",
                                    angle: -90,
                                    position: "insideLeft",
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="line" />
                                }
                            />
                            <Area
                                dataKey="latency"
                                type="natural"
                                fill="var(--color-latency)"
                                fillOpacity={0.4}
                                stroke="var(--color-latency)"
                                strokeWidth={2}
                                isAnimationActive={false}
                            />
                        </AreaChart>
                    </ChartContainer>
                ) : (
                    <div className="min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                        No latency data available
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
