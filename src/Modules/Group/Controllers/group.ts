// NPM modules
import { Request, Response } from "express";

// Managers
import groupManager from "../../../Manager/GroupManager";
// types
import { ResponsePayload } from "../../../utils/CommonTypes";

// Constants
import { SERVER_ERROR } from "../../../utils/Constants";

class Group {
    /**
     * @description - Creates a group
     * @param {Request} req
     * @param {Response} res
     */
    createGroup = async (req: Request, res: Response): Promise<void> => {
        const resPayload: ResponsePayload = {
            status: 200,
            error: false,
            data: null
        };
       
        try {
            const group = await groupManager.createGroup(req.body);
            resPayload.data = group;
        } catch (err: any) {
            resPayload.error = true;
            resPayload.status = 500;
            resPayload.data = err.toString();
        }

        res.json(resPayload);
    }

    /**
     * @description - Gets all the group of auth user
     * @param {Request} req
     * @param {Response} res
     */
    getGroups = async (req: Request, res: Response): Promise<void> => {
        const resPayload: ResponsePayload = {
            status: 200,
            error: false,
            data: null
        };

        try {
            const { id } = req.body.decoded;
            const groups = await groupManager.getUserGroups(id);
            resPayload.data = groups;
        } catch (err: any) {
            resPayload.error = true;
            resPayload.status = 500;
            resPayload.data = err.toString();
        }

        res.json(resPayload);
    }
}

export default new Group();
