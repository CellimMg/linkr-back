import { Router } from "express";
import { readPostsByHashtag, readTrendingHashtags } from "../controller/hashtagController.js";
import { tokenValidation } from '../middlewares/authMiddleware.js';

const hashtagRouter = Router();

hashtagRouter.get("/timeline/:hashtag", tokenValidation, readPostsByHashtag); 
hashtagRouter.get("/hashtags", readTrendingHashtags); 

export default hashtagRouter;