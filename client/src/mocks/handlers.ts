// src/mocks/handlers.js
import { rest, RequestHandler} from 'msw';

export const handlers: RequestHandler[] = [
    rest.post('/login', (req, res, ctx) => {
        const mockedLoginResponse = {
            status: 200,
            error: false,
            data: {
                name: 'John Doe',
                email: 'john@doe.com',
                _id: '965415412'
            }
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