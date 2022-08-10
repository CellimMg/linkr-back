import { Router } from "express";

const hashtagRouter = Router();

hashtagRouter.get("/timeline/:hashtag", readHashtag);
hashtagRouter.get("/hashtags", readTrendingHashtags);

export default hashtagRouter;