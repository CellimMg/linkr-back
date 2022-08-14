import {Router} from 'express';
import { postLike, getLikes,unLike, whoLikes } from '../controller/likesController.js';
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import likeSchema from '../schemas/likeSchema.js';

const likesRoute = Router();

likesRoute.post('/like',schemaValidate(likeSchema),postLike)
likesRoute.get('/like/:userId/:postId',getLikes)
likesRoute.delete('/unlike',schemaValidate(likeSchema),unLike)
likesRoute.get('/likes/:postId/:userId',whoLikes)

export default likesRoute;