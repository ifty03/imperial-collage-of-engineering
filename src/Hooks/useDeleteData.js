import { useState } from 'react';
import axios from 'axios';

const useDeleteData = (baseUrl, options = {}) => {
    const { headers = {} } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (id, customOptions = {}) => {
        setLoading(true);
        setError(null);

        const {
            params = {},
            headers: customHeaders = {},
            data: requestData = undefined
        } = customOptions;

        // Build URL with ID if provided
        const url = id ? `${baseUrl}/${id}` : baseUrl;

        try {
            const response = await axios.delete(url, {
                params,
                data: requestData,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                    ...customHeaders,
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

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    return { data, loading, error, deleteData, reset };
};

export default useDeleteData;