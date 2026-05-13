import { Router } from "express";
import validate from "@/middlewares/validate.middleware";
import { registerController } from "@/controllers/auth.controller";
import { registerValidator } from "@/middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", registerValidator, validate, registerController);

export default authRouter;
