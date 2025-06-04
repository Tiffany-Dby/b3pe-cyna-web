import { SALES_CHART } from "@/dashboard/constants/salesChart";
import { useSalesMetrics } from "@/dashboard/hooks/useSalesMetrics";
import { SalesMetricPoint } from "@/dashboard/types/Metrics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { ChartConfig } from "@/lib/components/ui/chart";
import { API_ROUTES } from "@/shared/constants/routes";
import BaseChart from "@/shared/ui/components/BaseChart";
import BaseSelect from "@/shared/ui/components/BaseSelect";
import Loader from "@/shared/ui/components/Loader";
import { formatDate } from "@/shared/utils/date";
import { formatAmount } from "@/shared/utils/number";
import { useTranslation } from "react-i18next";

const RevenuesChart = () => {
  const { t, i18n } = useTranslation("dashboard");
  const locale = i18n.resolvedLanguage;

  const amountOpts = {
    locale,
    currency: "EUR",
  };

  const dateOpts: Intl.DateTimeFormatOptions = {
    month: "numeric",
    day: "numeric",
  };

  const dateLongOpts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const {
    formattedData,
    isLoading,
    error,
    selectValue,
    onRangeChange,
    period,
    count,
  } = useSalesMetrics<SalesMetricPoint>(API_ROUTES.METRICS_SALES);

  const descriptionKey =
    period === "daily"
      ? "revenues.description.daily"
      : "revenues.description.weekly";
  const description = t(descriptionKey, { count });

  const selectOptions = SALES_CHART.REVENUES.TIME_RANGE_OPTS.map((option) => ({
    value: option.value,
    label: t(option.label),
  }));

  const chartConfig = {
    amount: {
      label: t("revenues.title"),
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="@container">
      <CardHeader className="flex flex-col gap-2 space-y-0 border-b @xl:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>
            <h2>{t("revenues.title")}</h2>
          </CardTitle>
          <CardDescription>
            {description}
            {error && <p className="text-danger">{error}</p>}
          </CardDescription>
        </div>
        <div className="w-full @lg:max-w-48 self-end">
          <BaseSelect
            name="revenuesTimeRange"
            placeholder={t("revenues.placeholder")}
            value={selectValue}
            onChange={onRangeChange}
            options={selectOptions}
          />
        </div>
      </CardHeader>
      <CardContent className="pl-1 pr-7 pt-4">
        {isLoading ? (
          <Loader />
        ) : (
          <BaseChart
            data={formattedData}
            config={chartConfig}
            xDataKey="period"
            xTickFormatter={(value) => formatDate(value, locale, dateOpts)}
            yTickFormatter={(value) => formatAmount(value / 100, amountOpts)}
            tooltipLabelFormatter={(value) =>
              formatDate(value, locale, dateLongOpts)
            }
            tooltipValueFormatter={(value) =>
              formatAmount(value / 100, amountOpts)
            }
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RevenuesChart;
