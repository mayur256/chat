// NPM modules
import { Router } from "express";

// Controller
import message from "./Controllers/message";

// Middlewares
import { verifyToken } from "../../middlewares/verifyToken";

export default function(router : Router) {
    router.get('/messages/:threadId', verifyToken, message.getMessages);
    router.get('/messages/group/:groupId', verifyToken, message.getGroupMessages);
}