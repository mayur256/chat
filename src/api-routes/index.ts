import { Router } from "express";

// Module wise routes
import authRoutes from "../Modules/User/routes";
import msgRoutes from "../Modules/Message/routes";

export default function (router: Router) {
    authRoutes(router);
    msgRoutes(router);
};
