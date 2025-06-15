const isString = (data: unknown) => typeof data === "string";

const isStringFilled = (data: unknown) =>
  isString(data) && !!data.trim().length;

const areStringsFilled = (data: unknown) =>
  Array.isArray(data) && data.every(isStringFilled);

export { isString, isStringFilled, areStringsFilled };
