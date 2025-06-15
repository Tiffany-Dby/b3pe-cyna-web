import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/lib/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";

type BasePieChartProps<
  T extends Record<string, string | number>,
  NameKey extends keyof T,
  ValueKey extends keyof T
> = {
  data: T[];
  config: ChartConfig;
  nameKey: NameKey;
  dataKey: ValueKey;
  labelFormatter: (value: T[NameKey]) => string;
  valueFormatter: (value: number) => string;
  label?: string;
};

const BasePieChart = <
  T extends Record<string, string | number>,
  NameKey extends keyof T,
  ValueKey extends keyof T
>({
  data,
  config,
  nameKey,
  dataKey,
  labelFormatter,
  valueFormatter,
}: BasePieChartProps<T, NameKey, ValueKey>) => {
  const colors = data.map((entry) => {
    const sliceName = entry[nameKey] as unknown as string;
    return config[sliceName]?.color ?? "var(--chart-1)";
  });

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={(props) => {
            if (!props.active || !props.payload || !props.payload.length)
              return null;

            const modifiedPayload = props.payload.map((item) => ({
              ...item,
              value:
                typeof item.value === "number"
                  ? valueFormatter(item.value)
                  : item.value,
            }));

            return (
              <ChartTooltipContent
                indicator="line"
                active={props.active}
                payload={modifiedPayload}
                labelFormatter={labelFormatter}
                nameKey={String(nameKey)}
              />
            );
          }}
        />

        <Pie
          data={data}
          dataKey={String(dataKey)}
          nameKey={String(nameKey)}
          cx="50%"
          cy="50%"
          outerRadius="80%"
        >
          {data.map((_, idx) => (
            <Cell key={`slice-${idx}`} fill={colors[idx]} />
          ))}
        </Pie>

        <ChartLegend
          content={<ChartLegendContent nameKey={String(nameKey)} />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
};

export default BasePieChart;
