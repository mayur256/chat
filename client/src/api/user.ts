import { fetchWrapper } from "../utilities/fetchWrapper"
import { ContactThreadType, IResponse } from "../components/types";

interface IUsersResponse extends IResponse {
    data: ContactThreadType[]
}
export const getUsers = (): Promise<IUsersResponse> => {
    return new Promise((resolve) => {
        (async () => {
            const response = await fetchWrapper(
                '/users',
                'GET',
                null,
            )

            resolve(response.json());
        })();
    })
}