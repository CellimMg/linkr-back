import {Router} from 'express';
import { postLike, getLikes,unLike } from '../controller/likesController.js';
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import likeSchema from '../schemas/likeSchema.js';

const likesRoute = Router();

likesRoute.post('/like',schemaValidate(likeSchema),postLike)
likesRoute.get('/like/:userId/:postId',getLikes)
likesRoute.delete('/unlike',schemaValidate(likeSchema),unLike)

export default likesRoute;