import {Router } from 'express';
import { comment } from '../controller/commentsController.js';
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import commentsSchema from '../schemas/commentsSchema.js';
import { tokenValidation } from '../middlewares/authMiddleware.js';


const commentRoute = Router();

commentRoute.post('/comments',tokenValidation,schemaValidate(commentsSchema),comment)

export default commentRoute;