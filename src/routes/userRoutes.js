import { Router } from 'express';
import { listUsers, userPosts } from '../controller/userController.js'
import { tokenValidation } from '../middlewares/authMiddleware.js';

const userRoute = Router();

userRoute.get('/user/:id', tokenValidation, userPosts)
userRoute.get('/users', tokenValidation, listUsers)

export default userRoute;