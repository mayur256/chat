import { fetchWrapper } from "../utilities/fetchWrapper"
import { IResponse, IAuthUser } from "../components/types";

interface LoginResponse extends IResponse {
    data: IAuthUser | string;
}
/** 
 * @param {string} email
 * @param {string} password
 * @returns Promise<LoginBody>
 */
export const login = ({email, password}: Partial<IAuthUser>): Promise<LoginResponse> => {
    return new Promise((resolve) => {
        (async () => {
            const response = await fetchWrapper(
                '/login',
                'POST',
                null,
                { email, password }
            )

            resolve(response.json());
        })();
    })
}

interface RegisterBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

/**
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password 
 * @returns Promise<RegisterBody>
 */
export const register = ({
    firstName,
    lastName,
    email,
    password,
}: RegisterBody): Promise<IResponse & {data: RegisterBody | string}> => {
    return new Promise(resolve => {
        (async () => {
            const response = await fetchWrapper(
                '/register',
                'POST',
                null,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                }
            );

            resolve(response.json());
        })();
    })
}