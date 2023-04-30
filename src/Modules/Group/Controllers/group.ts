// NPM modules
import { Request, Response } from "express";

// Managers
import groupManager from "../../../Manager/GroupManager";
// types
import { ResponsePayload } from "../../../utils/CommonTypes";

// Constants
import { SERVER_ERROR } from "../../../utils/Constants";

class Group {
    createGroup = async (req: Request, res: Response) => {
        const resPayload: ResponsePayload = {
            status: 200,
            error: false,
            data: null
        };

        const loggedInUserId = req.body.decoded.id;

        try {
            const group = await groupManager.createGroup(req.body);
            resPayload.data = group;
        } catch (err) {
            resPayload.error = true;
            resPayload.status = 500;
            resPayload.data = SERVER_ERROR;
        }

        res.json(resPayload);
    }
}

export default new Group();