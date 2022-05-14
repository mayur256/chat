// NPM modules
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Models
import User from "../Modules/User/Models/User";

// Injects env variables into this node process
dotenv.config();

// generates JWT token
function createJWT(payload: any) {
    const options = {
        expiresIn: '364d',
        issuer: process.env.FRONT_URL
    }
    const secret = process.env.SECRET ?? '';
    return jwt.sign(payload, secret, options);
}

export default {
    // Register handler function
    register: async ({ firstName, lastName, email, password }: any) => {
        let newUser = null;
        const name = `${firstName} ${lastName}`;
        const saltRounds = 5;

        try {
            //Instantiating User Model
            newUser = new User({ name, email });
            //Generate hashed password
            const hash = await bcrypt.hash(password, saltRounds);
            newUser.password = hash;
            //save the user in db
            await newUser.save();
        } catch (ex: any) {
            if (ex.name === 'MongoServerError') {
                throw ex;
            }
            console.log(`Error in register manager :: ${ex.name}`);
        }

        return newUser;
    },

    // Login handler
    login: async ({ email, password }: any) => {
        let result = null;

        try {
            const user = await User.findOne({ email });
            // check whether user with given mail id exists
            if (user) {
                // check if password matches
                const matches = await bcrypt.compare(password, user.password);
                if (matches) {
                    const payload = {
                        id: user._id
                    };

                    const token = createJWT(payload);

                    result = {
                        token,
                        name: user.name,
                        email,
                    }
                }
            }
        } catch (ex) {
            console.log(`Error in login handler :: ${ex}`);
        }

        return result;
    }
};