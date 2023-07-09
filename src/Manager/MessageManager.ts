// NPM modules

// Models
import Group from "../Modules/Group/Models/Group";
import Message from "../Modules/Message/Models/Message"

// type definitions
import { Message as IMessage } from "../utils/CommonTypes";

export default {
    // message store handler
    storeMessage: async (msgPayload: IMessage) => {
        try {
            const newMsg = await Message.create(msgPayload);
            
            // save a reference of message in group if it is a messsage in group
            if (newMsg?.group) {
                await Group.updateOne({ _id: newMsg.group }, { $addToSet: { messages: newMsg._id } });
            }

            return newMsg;
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
    },

    // gets all messages in a group
    /* getGroupMessages: async (groupId: string): Promise<IMessage[] | null> => {
        try {
            return await Message.find({ group: groupId });
        } catch (ex) {
            throw ex;
        }
    } */
}