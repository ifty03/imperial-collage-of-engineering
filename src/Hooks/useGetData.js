import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useGetData = (url, options = {}) => {
    const { autoFetch = true, params = {}, headers = {} } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Store serialized params to track changes
    const paramsRef = useRef(JSON.stringify(params));
    const currentParamsStr = JSON.stringify(params);

    const fetchData = async (customParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(url, {
                params: { ...params, ...customParams },
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            });

            setData(response.data);
            setLoading(false);
            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    const refetch = (customParams = {}) => {
        return fetchData(customParams);
    };

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    useEffect(() => {
        // Only fetch if params actually changed
        if (paramsRef.current !== currentParamsStr) {
            paramsRef.current = currentParamsStr;
        }
        if (autoFetch && url) {
            fetchData();
        }
    }, [url, autoFetch, currentParamsStr]);

    return { data, loading, error, refetch, reset };
};

export default useGetData;

