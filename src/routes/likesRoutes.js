import {Router} from 'express';
import { postLike, getLikes,unLike, whoLikes } from '../controller/likesController.js';
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import likeSchema from '../schemas/likeSchema.js';
import { tokenValidation } from '../middlewares/authMiddleware.js';


const likesRoute = Router();

likesRoute.post('/like',tokenValidation, schemaValidate(likeSchema),postLike)
likesRoute.get('/like/:userId/:postId',tokenValidation, getLikes)
likesRoute.post('/unlike',tokenValidation, schemaValidate(likeSchema),unLike) // deleta o like
likesRoute.get('/likes/:postId/:userId',tokenValidation, whoLikes)

export default likesRoute;