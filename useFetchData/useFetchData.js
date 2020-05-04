import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function useFetchData(
  initialBaseURL,
  initialUrl,
  initialData,
  initialHeaders,
  initialLoadState
) {
  const [baseURL, setBaseURL] = useState(initialBaseURL);
  const [headers, setHeaders] = useState(initialHeaders);
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(initialLoadState);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const Api = axios.create({
      baseURL: baseURL,
      headers: headers,
    });
    const fetch = async () => {
      setIsError(false);

      try {
        const res = await Api.get(url);
        setData(res.data.response);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetch();
  }, [baseURL, url, headers]);

  return [
    {
      data,
      isLoading,
      isError,
    },
    setUrl,
    setBaseURL,
    setHeaders,
  ];
}

useFetchData.propTypes = {
  initialBaseURL: PropTypes.string.isRequired,
  initialUrl: PropTypes.string.isRequired,
  initialData: PropTypes.any.isRequired,
  initialHeaders: PropTypes.object,
  initialLoadState: PropTypes.bool.isRequired,
};

export default useFetchData;
