"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Custom hook for fetching data asynchronously.
 * @param {Function} request - The request function to fetch data.
 * @param {...any} args - Additional arguments to pass to the request function.
 * @returns {Object} - The data, loading state, and error state.
 */
const useFetch = (request, ...args) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const { data, loading, error } = state;

  const prevRequest = useRef();
  const prevArgs = useRef([]);

  /**
   * Fetches the data using the provided request function.
   */
  const fetchData = useCallback(async () => {
    try {
      const response = await request(...args);
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error.message });
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
