import { Router } from "express";

// Module wise routes
import authRoutes from "../Modules/User/routes";
import msgRoutes from "../Modules/Message/routes";
import groupRoutes from "../Modules/Group/routes";

export default function (router: Router) {
    authRoutes(router);
    msgRoutes(router);
    groupRoutes(router);
};
