"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook for fetching data.
 *
 * @param {Function} request - The function that performs the data request.
 * @returns {Object} - The fetched data, loading state, and error state.
 */
const useFetch = (request, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request(...args);
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [request, ...args]);

  return { data, loading, error };
};

export default useFetch;
