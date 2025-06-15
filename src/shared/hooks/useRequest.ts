import { useCallback, useEffect, useState } from "react";
import { RequestFn } from "@/shared/types/Api";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

const useRequest = <T, R>(
  requestFn: RequestFn,
  url: string,
  payload: R | FormData,
  withAuth?: boolean
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  const handleRequest = useCallback(async () => {
    const { result, error } = await requestFn<T, R>(url, payload, withAuth);
    setState({ data: result, error, isLoading: false });
  }, [requestFn, url, payload, withAuth]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  return state;
};

export default useRequest;
