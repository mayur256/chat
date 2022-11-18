// NPM modules
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET, FRONT_URL } from "../config/keys";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.cookies.authorization;
    let result = null;

    if (authHeader) {
        const token = authHeader;
        const options = {
            expiresIn: '364d',
            issuer: FRONT_URL
        };

        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, SECRET!, options);

            // Let's pass back the decoded token to the request object
            req.body.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
        } catch (err) {
            result = {
                status: false,
                data: null,
                message: `Authentication Failed`
            }
            res.status(401).send(result);
        }
    } else {
        res.json({
            status: 401,
            error: 'Authentication token is missing'
        });
    }
}