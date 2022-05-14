type Method = 'GET' | 'POST' | 'DELETE' | 'UPDATE';

interface FetchRequestOptions {
    method: Method,
    headers: any,
    body: any
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
    };

    if (payload) {
        requestOptions.body = JSON.stringify(payload);
    }

    return fetch(url, requestOptions)
        .catch(error => console.log(error))
}