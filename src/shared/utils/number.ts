import i18next from "i18next";

const formatAmount = (
  value: number,
  opts?: {
    currency?: string;
    locale?: string;
  }
): string => {
  const { currency, locale = i18next.resolvedLanguage || "en" } = opts || {};

  const hasFraction = !Number.isInteger(value);

  const baseOptions: Intl.NumberFormatOptions = hasFraction
    ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    : { minimumFractionDigits: 0, maximumFractionDigits: 0 };

  const optionsWithCurrency: Intl.NumberFormatOptions = {
    ...baseOptions,
    style: "currency",
    currency,
  };

  const formatter = new Intl.NumberFormat(
    locale,
    currency ? optionsWithCurrency : baseOptions
  );

  return formatter.format(value);
};

export { formatAmount };
