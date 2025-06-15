import { isStringFilled } from "@/shared/utils/string";

const buildQueryString = (
  fields: Record<string, string | undefined | null>
) => {
  const params = new URLSearchParams();

  for (const key in fields) {
    if (isStringFilled(fields[key])) {
      params.set(key, (fields[key] as string).trim());
    }
  }

  return params.toString();
};

const buildUrl = (
  baseUrl: string,
  fields: Record<string, string | undefined | null>
) => {
  const queryString = buildQueryString(fields);

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export { buildQueryString, buildUrl };
