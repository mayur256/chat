// Utilities
import { BASE_API_URL } from "./Constants";

type Method = 'GET' | 'POST' | 'DELETE' | 'UPDATE';
type Include = 'include';

interface FetchRequestOptions {
    method: Method,
    headers: any,
    body: any,
    credentials: Include
}

export const fetchWrapper = async (
    url: string,
    method?: Method,
    headers?: null | {},
    payload?: null | {}
): Promise<any> => {
    const requestOptions: Partial<FetchRequestOptions> = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    };

    if (payload) {
        requestOptions.body = JSON.stringify(payload);
    }

    return fetch(`${BASE_API_URL}${url}`, requestOptions)
        .catch(error => console.log(error))
}