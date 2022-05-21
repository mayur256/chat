// NPM modules
import { Request, Response } from "express";

// managers
import messageManager from "../../../Manager/MessageManager";

// types
import { Message as IMessage, ResponsePayload } from "../../../utils/CommonTypes";

// Constants
import { SERVER_ERROR } from "../../../utils/Constants";

class Message {

    /**
     * 
     * @param req {Request}
     * @param res {Response}
     */
    getMessages = async (req: Request, res: Response) => {
        const resPayload: ResponsePayload = {
            status: 200,
            error: false,
            data: null
        };

        const loggedInUserId = req.body.decoded.id;
        const { threadId } = req.params;

        try { 
            const messages = await messageManager.getMessages(loggedInUserId, threadId);
            if (messages) resPayload.data = messages;
        } catch (ex) {
            resPayload.data = SERVER_ERROR;
            resPayload.status = 500;
            resPayload.error = true;
            console.log(`Error in Message Controller :: ${ex}`);
        }
        res.json(resPayload);
    }

    /**
     * @param msgPayload {IMessage}
     * @returns Promise<void>
     * @description stores a message on 'message' event of socket
     */
    storeMessage = async (msgPayload: IMessage): Promise<void> => {
        try {
            await messageManager.storeMessage(msgPayload);
        } catch (ex) {
            console.log(`Error in Message Controller :: ${ex}`);
        }
    }
}

export default new Message();
