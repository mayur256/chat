import { fetchWrapper } from "../utilities/fetchWrapper"
import { IResponse } from "../components/types";

type LoginBody =  {
    email: string;
    password: string;
}
interface LoginResponse extends IResponse {
    data: LoginBody | string;
}
/** 
 * @param {string} email
 * @param {string} password
 * @returns Promise<LoginBody>
 */
export const login = ({email, password}: LoginBody): Promise<LoginResponse> => {
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

interface RegisterBody extends LoginBody {
    firstName: string;
    lastName: string;
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