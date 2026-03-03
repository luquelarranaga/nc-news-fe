import { useState } from "react";
import { useEffect } from "react";

function useAxios(dataFunction, { deps = [], params = [] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setup() {
      setIsLoading(true);
      try {
        const result = await dataFunction(...params);
        setData(result);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    setup();
  }, [...deps]);
  return { isLoading, error, data };
}

export default useAxios;
