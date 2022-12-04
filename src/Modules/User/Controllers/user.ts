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

    /**
     * @desc alters online state of user 
     * @param {string} userId - user id whose online status is to be changed
     * @returns {boolean} - denoting status of operation
     */
    setOnlineStatus = async (userId: string, onlineStatus: boolean): Promise<boolean> => {
        let operationStatus = true;
        try {
            return await userManager.changeOnlineStatus(userId, onlineStatus);
        } catch (ex: any) {
            operationStatus = false;
        }

        return operationStatus;
    }
}

export default new User();