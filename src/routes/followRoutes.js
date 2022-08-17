import { Router } from "express";
import { readFollowRelation, writeFollowRelation } from "../controller/followController.js";
import { tokenValidation } from '../middlewares/authMiddleware.js';

const followRouter = Router();

followRouter.get('/follow/:followedId', readFollowRelation); 
followRouter.post('/follow', writeFollowRelation); 

export default followRouter;