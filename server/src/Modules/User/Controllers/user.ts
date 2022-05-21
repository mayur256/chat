// NPM modules
import { Request, Response } from "express";
import { ResponsePayload } from "../../../utils//CommonTypes";

// Service Managers
import userManager from "../../../Manager/UserManager";

// Constants
import { SERVER_ERROR } from "../../../utils/Constants";

class User {

    /**
     * @param req {Request}
     * @param res {Response}
     * @returns resPayload with users list
     */
    getUsers = async (req: Request, res: Response): Promise<any> => {
        const resPayload: ResponsePayload = {
            status: 200,
            error: false,
            data: null
        };

        try {
            const users = await userManager.getUsers(req.body.decoded.id);
            if (users) resPayload.data = users;
        } catch (ex) {
            resPayload.error = true;
            resPayload.status = 500;
            resPayload.data = SERVER_ERROR;
        }
        
        res.json(resPayload);
    }
}

export default new User();
