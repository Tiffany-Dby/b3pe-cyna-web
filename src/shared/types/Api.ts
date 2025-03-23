export type FetchConfig = {
  method: FetchMethod;
  headers: Record<string, string>;
  body?: string;
};

export enum FetchMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}
