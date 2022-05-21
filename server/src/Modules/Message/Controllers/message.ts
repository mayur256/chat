// NPM modules
import { Request, Response } from "express";

// managers
import messageManager from "../../../Manager/MessageManager";

class Message {
    getMessages = (req: Request, res: Response) => {

    }

    storeMessage = async (msgPayload: any) => {
        try {
            await messageManager.storeMessage(msgPayload);
        } catch (ex) {
            console.log(`Error in Message Controller :: ${ex}`);
        }
    }
}

export default new Message();
