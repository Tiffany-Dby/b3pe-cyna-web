import { SALES_CHART } from "@/dashboard/constants/salesChart";
import { useSalesMetrics } from "@/dashboard/hooks/useSalesMetrics";
import { SalesByCategoryMetricPoint } from "@/dashboard/types/Metrics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { ChartConfig } from "@/lib/components/ui/chart";
import { CHART } from "@/shared/constants/chart";
import { API_ROUTES } from "@/shared/constants/routes";
import BasePieChart from "@/shared/ui/components/BasePieChart";
import BaseSelect from "@/shared/ui/components/BaseSelect";
import Loader from "@/shared/ui/components/Loader";
import { useTranslation } from "react-i18next";

const SalesByCategoryChart = () => {
  const { t, i18n } = useTranslation("dashboard");
  const locale = i18n.resolvedLanguage;

  const {
    formattedData,
    isLoading,
    error,
    selectValue,
    onRangeChange,
    period,
    count,
  } = useSalesMetrics<SalesByCategoryMetricPoint>(
    API_ROUTES.METRICS_SALES_BY_CATEGORY,
    locale ?? "en"
  );

  const descriptionKey =
    period === "daily"
      ? "salesByCategory.description.daily"
      : "salesByCategory.description.weekly";
  const description = t(descriptionKey, { count });

  const selectOptions = SALES_CHART.REVENUES.TIME_RANGE_OPTS.map((option) => ({
    value: option.value,
    label: t(option.label),
  }));

  const chartConfig = formattedData.reduce<ChartConfig>((acc, entry, idx) => {
    acc[entry.category] = {
      label: entry.category,
      color: CHART.COLORS[idx % CHART.COLORS.length],
    };
    return acc;
  }, {});

  return (
    <Card className="@container">
      <CardHeader className="flex flex-col gap-2 space-y-0 border-b @xl:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>
            <h2>{t("salesByCategory.title")}</h2>
          </CardTitle>
          <CardDescription>
            {description}
            {error && <p className="text-danger">{error}</p>}
          </CardDescription>
        </div>
        <div className="w-full @lg:max-w-48 self-end">
          <BaseSelect
            name="salesByCategoryTimeRange"
            placeholder={t("salesByCategory.placeholder")}
            value={selectValue}
            onChange={onRangeChange}
            options={selectOptions}
          />
        </div>
      </CardHeader>
      <CardContent className="px-1 pt-4">
        {isLoading ? (
          <Loader />
        ) : (
          <BasePieChart
            data={formattedData}
            config={chartConfig}
            nameKey="category"
            dataKey="count"
            labelFormatter={() => t("salesByCategory.label")}
            valueFormatter={(value) => String(value)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SalesByCategoryChart;
