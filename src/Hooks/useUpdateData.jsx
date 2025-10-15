import { useState } from 'react';
import axios from 'axios';

const useUpdateData = (url, options = {}) => {
    const { headers = {} } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateData = async (updateData = {}, customOptions = {}) => {
        setLoading(true);
        setError(null);

        const {
            params = {},
            headers: customHeaders = {},
            method = 'PATCH' 
        } = customOptions;

        try {
            const response = await axios({
                method,
                url,
                data: updateData,
                params,
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

    return { data, loading, error, updateData, reset };
};

export default useUpdateData;