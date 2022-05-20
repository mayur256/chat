import { Document, Schema, model } from 'mongoose';

const modelName = 'User';

// interface declaration for model
export interface IUserModel extends Document {
    name: string;
    email: string;
    password: string;
    online: boolean;
    avatar: string;
    created_at: Date | null;
    auth_mechanism?: string | null;
    auth_token?: string | null;
    access_token?: string | null;
    updated_at?: Date | null;
    deleted_at?: Date | null;
};

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    auth_mechanism: {
        type: String,
        default: null
    },

    auth_token: {
        type: String,
        default: null
    },

    access_token: {
        type: String,
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
    }
});

export default model<IUserModel>(modelName, userSchema);
