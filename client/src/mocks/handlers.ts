// src/mocks/handlers.js
import { rest, RequestHandler, } from 'msw';
import { number } from 'yup';

interface LoginBody {
    email: string;
}

interface LoginResponse{
    status: number;
    error: boolean;
    data: any
}

export const handlers: RequestHandler[] = [
    rest.post<LoginBody>('/login', (req, res, ctx) => {
        const email = req.body?.email;

        let mockedLoginResponse: LoginResponse = {
            status: 200,
            error: false,
            data: {
                name: 'John Doe',
                email: 'john@doe.com',
                _id: '965415412'
            }
        }

        // Invalid credentials
        if (email !== 'a@b.com') {
            mockedLoginResponse = {
                status: 400,
                error: true,
                data: "Invalid Credentials!"
            };
        }
        
        return res(
            ctx.json(mockedLoginResponse)
        )
    }),

    rest.post('/register', (req, res, ctx) => {
        return res(
            ctx.json(req.body)
        )
    })
]