import { SALES_CHART } from "@/dashboard/constants/salesChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/lib/components/ui/chart";
import useChartTimeFilter from "@/shared/hooks/useChartTimeFilter";
import BaseSelect from "@/shared/ui/components/BaseSelect";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  {
    date: "2024-04-01",
    sales: 150,
  },
  {
    date: "2024-04-02",
    sales: 180,
  },
  {
    date: "2024-04-03",
    sales: 120,
  },
  {
    date: "2024-04-04",
    sales: 260,
  },
  {
    date: "2024-04-05",
    sales: 290,
  },
  {
    date: "2024-04-06",
    sales: 340,
  },
  {
    date: "2024-04-07",
    sales: 180,
  },
  {
    date: "2024-04-08",
    sales: 320,
  },
  {
    date: "2024-04-09",
    sales: 110,
  },
  {
    date: "2024-04-10",
    sales: 190,
  },
  {
    date: "2024-04-11",
    sales: 350,
  },
  {
    date: "2024-04-12",
    sales: 210,
  },
  {
    date: "2024-04-13",
    sales: 380,
  },
  {
    date: "2024-04-14",
    sales: 220,
  },
  {
    date: "2024-04-15",
    sales: 170,
  },
  {
    date: "2024-04-16",
    sales: 190,
  },
  {
    date: "2024-04-17",
    sales: 360,
  },
  {
    date: "2024-04-18",
    sales: 410,
  },
  {
    date: "2024-04-19",
    sales: 180,
  },
  {
    date: "2024-04-20",
    sales: 150,
  },
  {
    date: "2024-04-21",
    sales: 200,
  },
  {
    date: "2024-04-22",
    sales: 170,
  },
  {
    date: "2024-04-23",
    sales: 230,
  },
  {
    date: "2024-04-24",
    sales: 290,
  },
  {
    date: "2024-04-25",
    sales: 250,
  },
  {
    date: "2024-04-26",
    sales: 130,
  },
  {
    date: "2024-04-27",
    sales: 420,
  },
  {
    date: "2024-04-28",
    sales: 180,
  },
  {
    date: "2024-04-29",
    sales: 240,
  },
  {
    date: "2024-04-30",
    sales: 380,
  },
  {
    date: "2024-05-01",
    sales: 220,
  },
  {
    date: "2024-05-02",
    sales: 310,
  },
  {
    date: "2024-05-03",
    sales: 190,
  },
  {
    date: "2024-05-04",
    sales: 420,
  },
  {
    date: "2024-05-05",
    sales: 390,
  },
  {
    date: "2024-05-06",
    sales: 520,
  },
  {
    date: "2024-05-07",
    sales: 300,
  },
  {
    date: "2024-05-08",
    sales: 210,
  },
  {
    date: "2024-05-09",
    sales: 180,
  },
  {
    date: "2024-05-10",
    sales: 330,
  },
  {
    date: "2024-05-11",
    sales: 270,
  },
  {
    date: "2024-05-12",
    sales: 240,
  },
  {
    date: "2024-05-13",
    sales: 160,
  },
  {
    date: "2024-05-14",
    sales: 490,
  },
  {
    date: "2024-05-15",
    sales: 380,
  },
  {
    date: "2024-05-16",
    sales: 400,
  },
  {
    date: "2024-05-17",
    sales: 420,
  },
  {
    date: "2024-05-18",
    sales: 350,
  },
  {
    date: "2024-05-19",
    sales: 180,
  },
  {
    date: "2024-05-20",
    sales: 230,
  },
  {
    date: "2024-05-21",
    sales: 140,
  },
  {
    date: "2024-05-22",
    sales: 120,
  },
  {
    date: "2024-05-23",
    sales: 290,
  },
  {
    date: "2024-05-24",
    sales: 220,
  },
  {
    date: "2024-05-25",
    sales: 250,
  },
  {
    date: "2024-05-26",
    sales: 170,
  },
  {
    date: "2024-05-27",
    sales: 460,
  },
  {
    date: "2024-05-28",
    sales: 190,
  },
  {
    date: "2024-05-29",
    sales: 130,
  },
  {
    date: "2024-05-30",
    sales: 280,
  },
  {
    date: "2024-05-31",
    sales: 230,
  },
  {
    date: "2024-06-01",
    sales: 200,
  },
  {
    date: "2024-06-02",
    sales: 410,
  },
  {
    date: "2024-06-03",
    sales: 160,
  },
  {
    date: "2024-06-04",
    sales: 380,
  },
  {
    date: "2024-06-05",
    sales: 140,
  },
  {
    date: "2024-06-06",
    sales: 250,
  },
  {
    date: "2024-06-07",
    sales: 370,
  },
  {
    date: "2024-06-08",
    sales: 320,
  },
  {
    date: "2024-06-09",
    sales: 480,
  },
  {
    date: "2024-06-10",
    sales: 200,
  },
  {
    date: "2024-06-11",
    sales: 150,
  },
  {
    date: "2024-06-12",
    sales: 420,
  },
  {
    date: "2024-06-13",
    sales: 130,
  },
  {
    date: "2024-06-14",
    sales: 380,
  },
  {
    date: "2024-06-15",
    sales: 350,
  },
  {
    date: "2024-06-16",
    sales: 310,
  },
  {
    date: "2024-06-17",
    sales: 520,
  },
  {
    date: "2024-06-18",
    sales: 170,
  },
  {
    date: "2024-06-19",
    sales: 290,
  },
  {
    date: "2024-06-20",
    sales: 450,
  },
  {
    date: "2024-06-21",
    sales: 210,
  },
  {
    date: "2024-06-22",
    sales: 270,
  },
  {
    date: "2024-06-23",
    sales: 530,
  },
  {
    date: "2024-06-24",
    sales: 180,
  },
  {
    date: "2024-06-25",
    sales: 190,
  },
  {
    date: "2024-06-26",
    sales: 380,
  },
  {
    date: "2024-06-27",
    sales: 490,
  },
  {
    date: "2024-06-28",
    sales: 200,
  },
  {
    date: "2024-06-29",
    sales: 160,
  },
  {
    date: "2024-06-30",
    sales: 400,
  },
];
const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const SalesChart = () => {
  const { range, setRange, filteredData } = useChartTimeFilter(
    chartData,
    "90",
    new Date("2024-06-30")
  );

  return (
    <Card className="@container">
      <CardHeader className="flex flex-col gap-2 space-y-0 border-b py-5 @lg:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Sales</CardTitle>
          <CardDescription>
            Showing total sales for the last 3 months
          </CardDescription>
        </div>
        <div className=" w-full @lg:max-w-44 self-end">
          <BaseSelect
            name="timeRange"
            placeholder="Last 90 days"
            value={range}
            onChange={setRange}
            options={SALES_CHART.TIME_RANGE_OPTS}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-sales)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
