import {Router} from 'express';
import { listUsers} from '../controllers/userController.js'

const userRoute = Router();

userRoute.get('/user/:id')
userRoute.get('/users',listUsers)

export default userRoute;