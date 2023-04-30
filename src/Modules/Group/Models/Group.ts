import { Document, Schema, model } from 'mongoose';

const modelName = 'Group';

// interface declaration for model
export interface IGroupModel extends Document {
    name: string;
    slug: string;
    members: Array<string>;
    messages: Array<string>;
    created_by: string;
    created_at: Date;
    updated_at: Date | null;
    socketId?: string;
}

// schema definition
const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: {
        type: [Schema.Types.ObjectId],
        ref: 'Message',
        default: []
    },
    socketId: String,
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
