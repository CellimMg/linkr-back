import { Router } from "express";
import { signUp } from "../controller/authController.js"
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import signUpSchema from "../schemas/signUpSchema.js"

const authRouter = Router();


authRouter.post("/sign-up", schemaValidate(signUpSchema), signUp);

export default authRouter;
