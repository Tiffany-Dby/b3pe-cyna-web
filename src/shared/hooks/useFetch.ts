import { useCallback, useEffect, useState } from "react";
import { getRequest } from "@/shared/tools/api";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

const useFetch = <T>(url: string, withAuth?: boolean) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  const handleGetRequest = useCallback(async () => {
    const { result, error } = await getRequest<T>(url, withAuth);
    setState({ data: result, error, isLoading: false });
  }, [url, withAuth]);

  useEffect(() => {
    handleGetRequest();
  }, [handleGetRequest]);

  return state;
};

export default useFetch;
