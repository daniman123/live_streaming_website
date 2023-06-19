import { useEffect, useState, useRef } from "react";

const useFetch = (request, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevRequest = useRef();
  const prevArgs = useRef([]);

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

    if (
      prevRequest.current !== request ||
      !arraysEqual(prevArgs.current, args)
    ) {
      fetchData();
    }

    prevRequest.current = request;
    prevArgs.current = args;
  }, [request, args]);

  return { data, loading, error };
};

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export default useFetch;
