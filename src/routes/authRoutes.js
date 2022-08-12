import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const authRouter = Router();


authRouter.post("/sign-up", schemaValidate(signUpSchema), signUp);
authRouter.post("/sign-in", schemaValidate(signInSchema), signIn);

export default authRouter;
