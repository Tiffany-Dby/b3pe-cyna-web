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

export { enumToOptions };
