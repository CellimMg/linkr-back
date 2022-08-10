import {Router} from 'express';
import { listPosts} from '../controller/userController.js'

const userRoute = Router();

userRoute.get('/user/:id',listPosts)

export default userRoute;