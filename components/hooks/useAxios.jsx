import { useState } from "react";

function useAxios(dataFunction, { deps = [], params = [] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function setup() {
      setIsLoading(true);
      try {
        const { data } = await dataFunction(...params);
        setData(data);
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
