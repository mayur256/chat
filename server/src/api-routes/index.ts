import { Router } from "express";

// Module wise routes
import authRoutes from "../Modules/User/routes";

export default function (router: Router) {
    authRoutes(router);
};
