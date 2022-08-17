import {Router} from 'express';
import { postLike,unLike } from '../controller/likesController.js';
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import likeSchema from '../schemas/likeSchema.js';
import { tokenValidation } from '../middlewares/authMiddleware.js';


const likesRoute = Router();

likesRoute.post('/like',tokenValidation, schemaValidate(likeSchema),postLike)
likesRoute.post('/unlike',tokenValidation, schemaValidate(likeSchema),unLike) // deleta o like

export default likesRoute;