const formatAmount = (
  value: number,
  opts?: {
    currency?: string;
    locale?: string;
  }
): string => {
  const { currency, locale } = opts || {};

  const hasFraction = !Number.isInteger(value);

  const baseOptions: Intl.NumberFormatOptions = hasFraction
    ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    : { minimumFractionDigits: 0, maximumFractionDigits: 0 };

  const optionsWithCurrency: Intl.NumberFormatOptions = {
    ...baseOptions,
    style: "currency",
    currency,
  };

  return value.toLocaleString(
    locale,
    currency ? optionsWithCurrency : baseOptions
  );
};

export { formatAmount };
