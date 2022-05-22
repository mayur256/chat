// NPM modules
import { Request, Response } from "express";
import { ResponsePayload } from "../../../utils//CommonTypes";

// Service Managers
import authManager from "../../../Manager/AuthManager";

// Constants
import { SERVER_ERROR } from "../../../utils/Constants";

class Authentication {

    /**
     * 
     * @param req {Request} 
     * @param res  {Response}
     * @returns user details
     */
    register = async (req: Request, res: Response) => {
        const resPayload: ResponsePayload = {
            status: 200,
            error: false,
            data: null
        };

        try {
            // invoke register handler
            const user = await authManager.register(req.body);
            if (user) {
                const { name, email } = user;
                resPayload.data = { name, email };
            } else {
                resPayload.error = true;
            }
        } catch (ex: any){
            resPayload.error = true;
            resPayload.status = 500;
            resPayload.data = SERVER_ERROR;
            if (ex.name === 'MongoServerError') {
                resPayload.status = 400;
                resPayload.data = 'Account with the given email address already exists';
            }
        }

        res.json(resPayload);
    }

    login = async (req: Request, res: Response) => {
        const resPayload: ResponsePayload = {
            status: 200,
            error: false,
            data: null
        };

        try {
            const user = await authManager.login(req.body);
            const loginResult = await authManager.login(req.body);
            // In case user does not exists or password does not match return error
            if (!loginResult) {
                resPayload.error = true;
                resPayload.status = 400;
                resPayload.data = 'Something went wrong!';
            } else {
                const { name, email, token, _id } = loginResult;
                res.setHeader('Set-Cookie', `authorization=${token}; HttpOnly; SameSite=None; Secure; Max-Age=99999999`);
                resPayload.data = { name, email, _id };
            }
        } catch (ex: any) {
            resPayload.error = true;
            resPayload.status = 500;
            resPayload.data = SERVER_ERROR;
        }
        // send the response with Content-Type: application/json
        res.json(resPayload);
    }
};

export default new Authentication();
