import { useEffect, useState } from "react";
import { getRequest } from "../tools/api";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

const useFetch = <T>(url: string, token?: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  const handleGetRequest = async () => {
    const { result, error } = await getRequest<T>(url, token);
    setState({ data: result, error, isLoading: false });
  };

  useEffect(() => {
    handleGetRequest();
  }, [url]);

  return state;
};

export default useFetch;
