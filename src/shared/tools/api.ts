import {
  FetchConfig,
  FetchMethod,
  RequestFn,
  RequestPromise,
} from "@/shared/types/Api";
import { API_ROUTES } from "@/shared/constants/routes";

const getRequest = async <T>(
  url: string,
  token?: string
): RequestPromise<T> => {
  const config = {
    method: FetchMethod.GET,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  return await request<T>(url, config);
};

const postRequest: RequestFn = async <T, B extends object>(
  url: string,
  body: B | FormData,
  token?: string
) => {
  const isFormData = body instanceof FormData;

  const config: FetchConfig = {
    method: FetchMethod.POST,
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: isFormData ? body : JSON.stringify(body),
  };

  return await request<T>(url, config);
};

const putRequest: RequestFn = async <T, B extends object>(
  url: string,
  body: B,
  token?: string
) => {
  const config: FetchConfig = {
    method: FetchMethod.PUT,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  };

  return await request<T>(url, config);
};

const patchRequest: RequestFn = async <T, B extends object>(
  url: string,
  body: B,
  token?: string
) => {
  const config: FetchConfig = {
    method: FetchMethod.PATCH,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  };

  return await request<T>(url, config);
};

const deleteRequest = async <T>(
  url: string,
  token?: string
): RequestPromise<T> => {
  const config: FetchConfig = {
    method: FetchMethod.DELETE,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  return await request<T>(url, config);
};

const request = async <T>(
  url: string,
  config: FetchConfig
): RequestPromise<T> => {
  let result = [];
  let error = null;
  let status = -1;

  try {
    const response = await fetch(API_ROUTES.URL + url, config);

    status = response.status;
    result = await response.json();

    if (status >= 400)
      throw new Error(
        `Error ${status}: ${result?.detail || "Something went wrong"}`
      );
  } catch (err) {
    if (err instanceof Error) error = err.message;
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return { result, error, status };
  }
};

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
