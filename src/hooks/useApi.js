import { useState, useEffect } from "react";
import axios from "axios";

const useApi = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const doFetch = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } 
  };

  useEffect(() => {
    doFetch();
  }, [url]);

  return {
    data,
    error
  };
};

export default useApi;