const BASE_URL = 'http://localhost:8080/api/v1';

async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(url, config);

        if(response.status === 204) {
            return null
        }

        const data = await response.json();

        if (!response.ok) {
            return Promise.reject({
                status: response.status,
                error: data.error || "Bad Request",
                message: data.message || "Something went wrong",
                validationErrors: data.validationErrors || null,
                path: data.path
            });
        }
        return data;
    } catch (error) {
        if (!error.status){
            return Promise.reject({
                status: 500,
                error: "Network Error",
                message: "Failed to connect to the server. Is it running?"
            });
        }
        return Promise.reject(error);
    }
}

export const apiClient = {
    get: (endpoint, options) => request(endpoint, {method: 'GET', ...options}),
    post: (endpoint, body, options) => request(endpoint, {method: 'POST', body, ...options}),
    put: (endpoint, body, options) => request(endpoint, {method: 'PUT', body, ...options}),
    delete: (endpoint, options) => request(endpoint, {method: 'DELETE', ...options}),
};