import useFetch from "@/shared/hooks/useFetch";
import { useMemo, useState } from "react";
import { Period } from "@/dashboard/types/Metrics";

const useSalesMetrics = <T>(apiUrl: string, locale?: string) => {
  const [period, setPeriod] = useState<Period>("daily");
  const [count, setCount] = useState(7);

  let url = `${apiUrl}?period=${period}&count=${count}`;
  if (locale) url += `&locale=${locale}`;

  const { data, isLoading, error } = useFetch<T[]>(url);

  const formattedData = useMemo(() => data ?? [], [data]);

  const onRangeChange = (value: string) => {
    const [newPeriod, newCount] = value.split("-");
    if (
      newPeriod === "daily" ||
      (newPeriod === "weekly" && !Number.isNaN(newCount))
    ) {
      setPeriod(newPeriod);
      setCount(Number(newCount));
    }
  };

  return {
    formattedData,
    isLoading,
    error,
    selectValue: `${period}-${count}`,
    onRangeChange,
    period,
    count,
  };
};

export { useSalesMetrics };
