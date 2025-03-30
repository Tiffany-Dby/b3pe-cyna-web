type FetchConfig = {
  method: FetchMethod;
  headers: Record<string, string>;
  body?: string;
};

enum FetchMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

export type { FetchConfig };
export { FetchMethod };
