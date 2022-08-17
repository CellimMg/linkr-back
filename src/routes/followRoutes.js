import { Router } from "express";
import { readFollowRelation, writeFollowRelation } from "../controller/followController.js";
import { tokenValidation } from '../middlewares/authMiddleware.js';

const followRouter = Router();

followRouter.get('/follow', tokenValidation, readFollowRelation); 
followRouter.post('/follow', writeFollowRelation); 

export default followRouter;