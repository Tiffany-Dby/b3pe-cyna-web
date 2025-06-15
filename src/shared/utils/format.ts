import type { Option } from "@/shared/types/Option";

const enumToOptions = <T extends Record<string, string | number>>(
  enumObject: T
): Option[] =>
  Object.keys(enumObject)
    .filter((key) => typeof enumObject[key] === "number")
    .map((key) => ({
      label: key,
      value: String(enumObject[key]),
    }));

const formatServerError = (
  payload?: { detail: string | Record<string, unknown>[] },
  statusText: string = ""
) => {
  const detail = payload?.detail;

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail))
    return detail
      .map((error) => {
        if (typeof error === "string") return error;
        if (error?.msg && typeof error.msg === "string") return error.msg;
        if (typeof error === "object" && error !== null)
          return JSON.stringify(error);

        return String(error);
      })
      .join("; ");

  if (typeof payload === "object" && payload !== null)
    return Object.entries(payload)
      .map(([key, value]) =>
        Array.isArray(value)
          ? `${key}: ${value.join(", ")}`
          : `${key}: ${String(value)}`
      )
      .join("; ");

  return statusText || "Something went wrong";
};

export { enumToOptions, formatServerError };
