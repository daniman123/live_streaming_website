import { useEffect, useState, useRef, useCallback } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Object | null;
};

const useFetch = <T,>(
  request: (...args: any[]) => Promise<T>,
  ...args: any[]
): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const { data, loading, error } = state;

  const prevRequest = useRef<(...args: any[]) => Promise<T>>();
  const prevArgs = useRef<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await request(...args);
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: Object(error) });
    }
  }, [request, args]);

  useEffect(() => {
    if (
      prevRequest.current !== request ||
      JSON.stringify(prevArgs.current) !== JSON.stringify(args)
    ) {
      fetchData();
    }

    prevRequest.current = request;
    prevArgs.current = args;
  }, [fetchData, request, args]);

  return { data, loading, error };
};

export default useFetch;
