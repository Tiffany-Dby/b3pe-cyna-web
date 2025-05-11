type ReqPromise<T> = {
  result: T;
  error: string | null;
  status: number;
};

type RequestFn = <T, B>(
  url: string,
  body: B | FormData,
  withAuth?: boolean
) => Promise<ReqPromise<T>>;

enum FetchMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type { RequestFn };
export { FetchMethod };
