// NPM modules
import { Request, Response } from "express";

// managers
import messageManager from "../../../Manager/MessageManager";

// Socket instances 
import { serverSocket } from "../../../server";

// types
import { Message as IMessage, ResponsePayload } from "../../../utils/CommonTypes";
import { IMessageModel } from "../Models/Message";

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
            const createdMsg: IMessageModel = await messageManager.storeMessage(msgPayload);
            const {
                _id,
                from,
                to,
                payload,
                sent_at,
                type,
                received_at
            } = createdMsg;
            
            // echo the created message back to clients
            serverSocket.emit('echoMessage', {
                _id,
                from,
                to,
                payload,
                sent_at,
                type,
                received_at
            });
        } catch (ex) {
            console.log(`Error in Message Controller :: ${ex}`);
        }
    }
}

export default new Message();
