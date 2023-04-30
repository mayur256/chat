import { Document, Schema, model } from 'mongoose';

const modelName = 'Group';

// interface declaration for model
export interface IGroupModel extends Document {
    name: string;
    socketId: string;
    members: Array<string>;
    messages: Array<string>;
    created_at: Date;
    updated_at: Date | null
}

const groupSchema = new Schema({
    name: String,
    socketId: String,
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    messages: {
        type: [Schema.Types.ObjectId],
        ref: 'Message',
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
})

export default model<IGroupModel>(modelName, groupSchema);
