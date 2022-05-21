// NPM modules

// Models
import Message from "../Modules/Message/Models/Message"

export default {
    // message store handler
    storeMessage: async (msgPayload: any) => {
        try {
            await Message.create(msgPayload);
        } catch (ex: any) {
            throw ex;
        }
    }
}