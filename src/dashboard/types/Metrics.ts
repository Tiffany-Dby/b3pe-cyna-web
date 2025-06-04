type SalesMetricPoint = {
  period: string;
  amount: number;
  count: number;
};

type SalesByCategoryMetricPoint = {
  category: string;
  amount: number;
  count: number;
};

type Period = "daily" | "weekly";

export type { SalesMetricPoint, SalesByCategoryMetricPoint, Period };
