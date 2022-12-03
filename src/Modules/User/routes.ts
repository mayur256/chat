// Import controller
import auth from "./Controllers/auth";
import user from "./Controllers/user";

// Middleware
import { verifyToken } from "../../middlewares/verifyToken";

export default function (router: any) {
    // public routes
    router.post('/register', auth.register);
    router.post('/login', auth.login);

    // private routes
    router.get('/users', verifyToken, user.getUsers);
}