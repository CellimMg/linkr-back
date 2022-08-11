import { Router } from "express";
import { readPostsByHashtag, readTrendingHashtags } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get("/timeline/:hashtag", readPostsByHashtag); // ao clicar em uma hashtag, seja no post ou na Trending, recebe lista dos posts com a hashtag
hashtagRouter.get("/hashtags", readTrendingHashtags); //retorna apenas o nome das 10 hashtags mais recorrentes

export default hashtagRouter;