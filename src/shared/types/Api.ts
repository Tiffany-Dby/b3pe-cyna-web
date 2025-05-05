type RequestPromise<T> = Promise<{
  result: T;
  error: string | null;
  status: number;
}>;

type RequestFn = <T, B extends object>(
  url: string,
  body: B | FormData,
  token?: string
) => RequestPromise<T>;

type FetchConfig = {
  method: FetchMethod;
  headers: Record<string, string>;
  body?: string | FormData;
};

enum FetchMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type { FetchConfig, RequestFn, RequestPromise };
export { FetchMethod };
