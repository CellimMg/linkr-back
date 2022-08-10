import { Router } from "express";

//importar schemas e validators (middlewares)

const hashtagRouter = Router();

hashtagRouter.get("/timeline/:hashtag", readHashtag);
hashtagRouter.get("/hashtags", readTrendingHashtags);