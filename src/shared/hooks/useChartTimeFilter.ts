import { useMemo, useState } from "react";

const useChartTimeFilter = <T extends { date: string }>(
  data: T[],
  initialRange: string = "90",
  referenceDate: Date = new Date()
) => {
  const [range, setRange] = useState<string>(initialRange);

  const filteredData = useMemo(() => {
    const daysToSubstract = parseInt(range);

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubstract);

    return data.filter((item) => new Date(item.date) >= startDate);
  }, [data, range, referenceDate]);

  return { range, setRange, filteredData };
};

export default useChartTimeFilter;
