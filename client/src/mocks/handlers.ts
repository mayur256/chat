// src/mocks/handlers.js
import { rest, RequestHandler} from 'msw';

export const handlers: RequestHandler[] = [
    rest.post('/login', (req, res, ctx) => {
        return res(
            ctx.json(req.body)
        )
    }),

    rest.post('/register', (req, res, ctx) => {
        return res(
            ctx.json(req.body)
        )
    })
]