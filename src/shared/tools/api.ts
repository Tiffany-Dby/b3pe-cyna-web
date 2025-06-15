import { FetchMethod } from "@/shared/types/Api";
import { getAccessToken, refresh } from "@/shared/tools/auth";
import { API_ROUTES } from "@/shared/constants/routes";
import { formatServerError } from "@/shared/utils/format";

const request = async <T>(
  url: string,
  config: RequestInit,
  withAuth: boolean = true
): Promise<{ result: T; error: string | null; status: number }> => {
  let result = [];
  let error = null;
  let status = -1;

  const token = getAccessToken();
  config.credentials = "include";
  config.headers = {
    ...(config.headers || {}),
    ...(withAuth ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    let response = await fetch(API_ROUTES.URL + url, config);

    if (response.status === 401 && url !== API_ROUTES.REFRESH) {
      const newToken = await refresh();
      if (newToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        };

        response = await fetch(API_ROUTES.URL + url, config);
      }
    }

    status = response.status;
    result = await response.json();

    if (status >= 400) {
      const message = formatServerError(result, response.statusText);
      throw new Error(message);
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Something went wrong";
  }

  return { result, error, status };
};

const getRequest = <T>(url: string, withAuth?: boolean) =>
  request<T>(
    url,
    {
      method: FetchMethod.GET,
    },
    withAuth
  );

const postRequest = <T, B>(
  url: string,
  body: B | FormData,
  withAuth?: boolean
) =>
  request<T>(
    url,
    {
      method: FetchMethod.POST,
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers: body instanceof FormData ? {} : {},
    },
    withAuth
  );

const putRequest = <T, B>(url: string, body: B, withAuth?: boolean) =>
  request<T>(
    url,
    {
      method: FetchMethod.PUT,
      body: JSON.stringify(body),
    },
    withAuth
  );

const patchRequest = <T, B>(url: string, body: B, withAuth?: boolean) =>
  request<T>(
    url,
    {
      method: FetchMethod.PATCH,
      body: JSON.stringify(body),
    },
    withAuth
  );

const deleteRequest = <T>(url: string, withAuth?: boolean) =>
  request<T>(
    url,
    {
      method: FetchMethod.DELETE,
    },
    withAuth
  );

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
