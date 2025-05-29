"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
    [k in string]: {
        label?: React.ReactNode;
        icon?: React.ComponentType;
    } & (
        | { color?: string; theme?: never }
        | { color?: never; theme: Record<keyof typeof THEMES, string> }
    );
};

type ChartContextProps = {
    config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

/**
 * Provides access to the current chart configuration context.
 *
 * @returns The chart configuration from the nearest {@link ChartContainer}.
 *
 * @throws {Error} If called outside of a {@link ChartContainer}.
 */
function useChart() {
    const context = React.useContext(ChartContext);

    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }

    return context;
}

/**
 * Provides theming and configuration context for a chart and renders its container.
 *
 * Wraps chart content with a context provider for configuration, applies scoped CSS variables for theming, and renders children inside a responsive container.
 *
 * @param id - Optional unique identifier for the chart instance.
 * @param className - Additional class names for the chart container.
 * @param config - Chart configuration object defining labels, icons, and colors for chart items.
 * @param children - Chart components to be rendered inside the responsive container.
 */
function ChartContainer({
    id,
    className,
    children,
    config,
    ...props
}: React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
}) {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-slot="chart"
                data-chart={chartId}
                className={cn(
                    "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
                    className,
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter(
        ([, config]) => config.theme || config.color,
    );

    if (!colorConfig.length) {
        return null;
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
    .map(([key, itemConfig]) => {
        const color =
            itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
            itemConfig.color;
        return color ? `  --color-${key}: ${color};` : null;
    })
    .join("\n")}
}
`,
                    )
                    .join("\n"),
            }}
        />
    );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

/**
 * Renders a customizable tooltip content component for Recharts charts, supporting theming, custom indicators, and flexible label/value formatting.
 *
 * Displays chart data details in a styled tooltip, with options to show or hide labels and indicators, customize indicator style, and format labels and values. Integrates with chart configuration for icons, colors, and labels.
 *
 * @param indicator - The style of the indicator shown next to each entry ("dot", "line", or "dashed").
 * @param hideLabel - If true, hides the tooltip label.
 * @param hideIndicator - If true, hides the indicator next to each entry.
 * @param labelFormatter - Optional function to customize the label rendering.
 * @param formatter - Optional function to customize the value rendering for each entry.
 * @param nameKey - Optional key to use for extracting the entry name from the payload.
 * @param labelKey - Optional key to use for extracting the label from the payload.
 *
 * @returns The rendered tooltip content, or null if inactive or no data is available.
 */
function ChartTooltipContent({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
        hideLabel?: boolean;
        hideIndicator?: boolean;
        indicator?: "line" | "dot" | "dashed";
        nameKey?: string;
        labelKey?: string;
    }) {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload?.length) {
            return null;
        }

        const [item] = payload;
        const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const value =
            !labelKey && typeof label === "string"
                ? config[label as keyof typeof config]?.label || label
                : itemConfig?.label;

        if (labelFormatter) {
            return (
                <div className={cn("font-medium", labelClassName)}>
                    {labelFormatter(value, payload)}
                </div>
            );
        }

        if (!value) {
            return null;
        }

        return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [
        label,
        labelFormatter,
        payload,
        hideLabel,
        labelClassName,
        config,
        labelKey,
    ]);

    if (!active || !payload?.length) {
        return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
        <div
            className={cn(
                "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
                className,
            )}
        >
            {!nestLabel ? tooltipLabel : null}
            <div className="grid gap-1.5">
                {payload.map((item, index) => {
                    const key = `${nameKey || item.name || item.dataKey || "value"}`;
                    const itemConfig = getPayloadConfigFromPayload(
                        config,
                        item,
                        key,
                    );
                    const indicatorColor =
                        color || item.payload.fill || item.color;

                    return (
                        <div
                            key={item.dataKey}
                            className={cn(
                                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                                indicator === "dot" && "items-center",
                            )}
                        >
                            {formatter &&
                            item?.value !== undefined &&
                            item.name ? (
                                formatter(
                                    item.value,
                                    item.name,
                                    item,
                                    index,
                                    item.payload,
                                )
                            ) : (
                                <>
                                    {itemConfig?.icon ? (
                                        <itemConfig.icon />
                                    ) : (
                                        !hideIndicator && (
                                            <div
                                                className={cn(
                                                    "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                                                    {
                                                        "h-2.5 w-2.5":
                                                            indicator === "dot",
                                                        "w-1":
                                                            indicator ===
                                                            "line",
                                                        "w-0 border-[1.5px] border-dashed bg-transparent":
                                                            indicator ===
                                                            "dashed",
                                                        "my-0.5":
                                                            nestLabel &&
                                                            indicator ===
                                                                "dashed",
                                                    },
                                                )}
                                                style={
                                                    {
                                                        "--color-bg":
                                                            indicatorColor,
                                                        "--color-border":
                                                            indicatorColor,
                                                    } as React.CSSProperties
                                                }
                                            />
                                        )
                                    )}
                                    <div
                                        className={cn(
                                            "flex flex-1 justify-between leading-none",
                                            nestLabel
                                                ? "items-end"
                                                : "items-center",
                                        )}
                                    >
                                        <div className="grid gap-1.5">
                                            {nestLabel ? tooltipLabel : null}
                                            <span className="text-muted-foreground">
                                                {itemConfig?.label || item.name}
                                            </span>
                                        </div>
                                        {item.value && (
                                            <span className="text-foreground font-mono font-medium tabular-nums">
                                                {item.value.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const ChartLegend = RechartsPrimitive.Legend;

/**
 * Renders a styled legend for a chart, displaying icons or colored squares and labels for each legend entry.
 *
 * @param hideIcon - If true, hides custom icons and displays colored squares instead.
 * @param nameKey - Optional key to use for legend item identification.
 * @returns A React element representing the chart legend, or null if there are no legend items.
 */
function ChartLegendContent({
    className,
    hideIcon = false,
    payload,
    verticalAlign = "bottom",
    nameKey,
}: React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
        hideIcon?: boolean;
        nameKey?: string;
    }) {
    const { config } = useChart();

    if (!payload?.length) {
        return null;
    }

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-4",
                verticalAlign === "top" ? "pb-3" : "pt-3",
                className,
            )}
        >
            {payload.map((item) => {
                const key = `${nameKey || item.dataKey || "value"}`;
                const itemConfig = getPayloadConfigFromPayload(
                    config,
                    item,
                    key,
                );

                return (
                    <div
                        key={item.value}
                        className={cn(
                            "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
                        )}
                    >
                        {itemConfig?.icon && !hideIcon ? (
                            <itemConfig.icon />
                        ) : (
                            <div
                                className="h-2 w-2 shrink-0 rounded-[2px]"
                                style={{
                                    backgroundColor: item.color,
                                }}
                            />
                        )}
                        {itemConfig?.label}
                    </div>
                );
            })}
        </div>
    );
}

/**
 * Retrieves the chart configuration entry corresponding to a given payload and key.
 *
 * Examines the payload and its nested `payload` property to determine the appropriate config key, returning the matching config object if found.
 *
 * @param config - The chart configuration object.
 * @param payload - The payload item, potentially containing nested data.
 * @param key - The key to look up in the config.
 * @returns The matching config entry, or `undefined` if not found.
 */
function getPayloadConfigFromPayload(
    config: ChartConfig,
    payload: unknown,
    key: string,
) {
    if (typeof payload !== "object" || payload === null) {
        return undefined;
    }

    const payloadPayload =
        "payload" in payload &&
        typeof payload.payload === "object" &&
        payload.payload !== null
            ? payload.payload
            : undefined;

    let configLabelKey: string = key;

    if (
        key in payload &&
        typeof payload[key as keyof typeof payload] === "string"
    ) {
        configLabelKey = payload[key as keyof typeof payload] as string;
    } else if (
        payloadPayload &&
        key in payloadPayload &&
        typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
    ) {
        configLabelKey = payloadPayload[
            key as keyof typeof payloadPayload
        ] as string;
    }

    return configLabelKey in config
        ? config[configLabelKey]
        : config[key as keyof typeof config];
}

export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
};
