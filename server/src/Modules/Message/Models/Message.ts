import { Document, Schema, model } from 'mongoose';

const modelName = 'Message';

// interface declaration for model
export interface IMessageModel extends Document {
    from: string;
    to: string;
    group: string;
    payload: string;
    type: string;
    sent_at: Date | null;
    received_at: Date | null;
    created_at: Date | null;
    updated_at?: Date | null;
    deleted_at?: Date | null;
};

const messageSchema: Schema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    payload: {
        type: String,
        required: true
    },

    group: {
        type: String,
        default: null,
    },

    type: {
        type: String,
        default: 'text',
    },

    sent_at: {
        type: Date,
        required: true
    },

    received_at: {
        type: Date,
        default: null
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: null
    },

    deleted_at: {
        type: Date,
        default: null
    },
});

export default model<IMessageModel>(modelName, messageSchema);