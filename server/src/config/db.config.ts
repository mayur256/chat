import mongoose from "mongoose";
import dotenv from "dotenv";

// Injects env variables into this node process
dotenv.config();

// Connection URI
const mongoURI = `mongodb://${process.env.HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`;

// Connection options
const options = {
    //useMongoClient: true,
    autoIndex: true, // build indexes
};

// Establish connection with mongoDB
const connect = () => {
    console.log("reached here");
    mongoose.connect(mongoURI, options)
        .then(() => {
            console.log("✅ ✅ ✅ --- Mongo DB connected --- ✅ ✅ ✅");
        })
        .catch(err => console.log(`Error while connecting to database :: ${err}`));
};

const disconnect = () => {
    if (!mongoose.connection) {
        return;
    }
    mongoose.disconnect();
    mongoose.connection.once("close", async () => {
        console.log("Disconnected from database");
    });
}

export default {
    connect,
    disconnect
};
