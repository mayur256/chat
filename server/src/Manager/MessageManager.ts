// NPM modules

// Models
import Message from "../Modules/Message/Models/Message"

// type definitions
import { Message as IMessage } from "../utils/CommonTypes";

export default {
    // message store handler
    storeMessage: async (msgPayload: IMessage) => {
        try {
            await Message.create(msgPayload);
        } catch (ex: any) {
            throw ex;
        }
    },

    // get all messages based on from and to
    getMessages: async (loggedInUserId: string, threadId: string) => {
        const queryParams = [loggedInUserId, threadId];
        try {
            return await Message.find({
                from: { $in: queryParams },
                to: { $in: queryParams }
            })
        } catch (ex) {
            throw ex;
        }
    }
}