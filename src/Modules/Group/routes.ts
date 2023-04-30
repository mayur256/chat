// Import controller
import group from "./Controllers/group";

// Middleware
import { verifyToken } from "../../middlewares/verifyToken";

export default function (router: any) {
    // private routes
    router.post('/group', verifyToken, group.createGroup);
}
