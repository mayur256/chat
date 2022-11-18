import dotenv from "dotenv";

// Injects env variables into this node process
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI as string;
export const SECRET = process.env.SECRET as string;
export const FRONT_URL = process.env.FRONT_URL;
export const PORT = process.env.PORT;