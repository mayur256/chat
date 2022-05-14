// Import controller
import auth from "./Controllers/auth";

export default function (router: any) {
    // public routes
    router.post('/register', auth.register);
    router.post('/login', auth.login);
}