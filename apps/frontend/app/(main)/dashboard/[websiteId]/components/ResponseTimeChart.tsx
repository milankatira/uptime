"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
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

type TimeRange = "30m" | "1w" | "1m" | "1y";

interface ResponseTimeChartProps {
    averagedTicks: AveragedTick[];
    timeRange: TimeRange;
}

// Define chart configuration for latency
const chartConfig = {
    latency: {
        label: "Latency (ms)",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

/**
 * Displays an interactive area chart visualizing website latency trends over time, adapting labels, titles, and descriptions based on the selected time range.
 *
 * @param averagedTicks - Array of aggregated latency data points to plot.
 * @param timeRange - Selected time range for the chart ("30m", "1w", "1m", or "1y").
 *
 * @returns A React component rendering the latency chart or a message if no data is available.
 */
export function ResponseTimeChart({
    averagedTicks,
    timeRange,
}: ResponseTimeChartProps) {
    // Format X-axis labels based on time range
    const formatXAxis = (timestamp: number) => {
        const date = new Date(timestamp);

        switch (timeRange) {
            case "1y":
                return date.toLocaleDateString([], { month: "short" });
            case "1m":
                return date.toLocaleDateString([], {
                    day: "numeric",
                    month: "short",
                });
            case "1w":
                return date.toLocaleDateString([], { weekday: "short" });
            default: // 30m
                return date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });
        }
    };

    // Prepare data for the chart
    const chartData = useMemo(() => {
        return averagedTicks
            .map((tick) => {
                const time = new Date(tick.windowStart).getTime();
                return {
                    time,
                    latency: tick.avgLatency,
                    status: tick.status,
                };
            })
            .sort((a, b) => a.time - b.time); // Sort chronologically
    }, [averagedTicks]);

    // Get chart title based on time range
    const getChartTitle = () => {
        switch (timeRange) {
            case "1y":
                return "Monthly Response Times";
            case "1m":
                return "Daily Response Times";
            case "1w":
                return "Daily Response Times";
            default:
                return "Response Time (3-min averages)";
        }
    };

    // Get chart description based on time range
    const getChartDescription = () => {
        switch (timeRange) {
            case "1y":
                return "Average monthly latency measurements";
            case "1m":
                return "Average daily latency measurements";
            case "1w":
                return "Average daily latency measurements";
            default:
                return "Latency over time grouped in 3-minute windows";
        }
    };

    return (
        <Card className="bg-white dark:bg-gray-900 mb-5">
            <CardHeader>
                <CardTitle>{getChartTitle()}</CardTitle>
                <CardDescription>{getChartDescription()}</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className="min-h-[300px] w-full"
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                    stroke="hsl(var(--border))"
                                />
                                <XAxis
                                    dataKey="time"
                                    tickFormatter={formatXAxis}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    minTickGap={timeRange === "30m" ? 20 : 50}
                                    tick={{
                                        fill: "hsl(var(--muted-foreground))",
                                        fontSize: 12,
                                    }}
                                />
                                <YAxis
                                    dataKey="latency"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    tick={{
                                        fill: "hsl(var(--muted-foreground))",
                                        fontSize: 12,
                                    }}
                                    label={{
                                        value: "Latency (ms)",
                                        angle: -90,
                                        position: "insideLeft",
                                        style: {
                                            textAnchor: "middle",
                                            fill: "hsl(var(--muted-foreground))",
                                        },
                                        offset: -10,
                                    }}
                                />
                                <ChartTooltip
                                    cursor={{
                                        stroke: "hsl(var(--border))",
                                        strokeWidth: 1,
                                    }}
                                    content={({ active, payload }) => {
                                        if (
                                            active &&
                                            payload &&
                                            payload.length
                                        ) {
                                            const data = payload[0].payload;
                                            const date = new Date(data.time);
                                            const formattedDate =
                                                date.toLocaleString([], {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                });

                                            return (
                                                <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
                                                    <p className="font-medium">
                                                        {formattedDate}
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="text-gray-500 dark:text-gray-400">
                                                            Latency:{" "}
                                                        </span>
                                                        <span className="font-mono">
                                                            {data.latency.toFixed(
                                                                1,
                                                            )}{" "}
                                                            ms
                                                        </span>
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="text-gray-500 dark:text-gray-400">
                                                            Status:{" "}
                                                        </span>
                                                        <span
                                                            className={
                                                                data.status ===
                                                                "Good"
                                                                    ? "text-emerald-600 dark:text-emerald-400"
                                                                    : "text-rose-600 dark:text-rose-400"
                                                            }
                                                        >
                                                            {data.status}
                                                        </span>
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    dataKey="latency"
                                    type="monotone"
                                    fill="hsl(var(--chart-1))"
                                    fillOpacity={0.2}
                                    stroke="hsl(var(--chart-1))"
                                    strokeWidth={2}
                                    isAnimationActive={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
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
