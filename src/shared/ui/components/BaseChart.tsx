import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/lib/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

type Props<T extends Record<string, string | number>, K extends keyof T> = {
  data: T[];
  config: ChartConfig;
  xDataKey: K;
  xTickFormatter: (value: T[K]) => string;
  yTickFormatter: (value: number) => string;
  tooltipLabelFormatter: (value: T[K]) => string;
  tooltipValueFormatter: (value: number) => string;
  allowDecimals?: boolean;
};

const BaseChart = <
  T extends Record<string, string | number>,
  K extends keyof T
>({
  data,
  config,
  xDataKey,
  xTickFormatter,
  yTickFormatter,
  tooltipLabelFormatter,
  tooltipValueFormatter,
  allowDecimals = true,
}: Props<T, K>) => {
  const chartDataKeys = Object.keys(config);

  return (
    <ChartContainer config={config} className="aspect-auto h-[250px] w-full">
      <AreaChart data={data}>
        <defs>
          {chartDataKeys.map((key) => {
            const gradId = `fill-${key}`;
            const color = config[key].color;

            return (
              <linearGradient id={gradId} key={key} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={String(xDataKey)}
          tickLine={true}
          axisLine={true}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={xTickFormatter}
          className="capitalize"
        />
        <YAxis
          allowDecimals={allowDecimals}
          tickFormatter={yTickFormatter}
          className="capitalize"
        />
        <ChartTooltip
          cursor={false}
          content={(props) => {
            if (!props.active || !props.payload || !props.payload.length)
              return null;

            const modifiedPayload = props.payload.map((item) => ({
              ...item,
              value:
                typeof item.value === "number"
                  ? tooltipValueFormatter(item.value)
                  : item.value,
            }));

            return (
              <ChartTooltipContent
                indicator="line"
                active={props.active}
                payload={modifiedPayload}
                label={tooltipLabelFormatter(props.label)}
                labelClassName="capitalize"
              />
            );
          }}
        />
        {chartDataKeys.map((key, i) => (
          <Area
            key={key}
            dataKey={key}
            type="bump"
            fill={`url(#fill-${key})`}
            stroke={config[key].color}
            stackId={i}
          />
        ))}
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default BaseChart;
