import { Router } from "express";
import timelineController from "../controllers/timelineControllers.js";
import timelineMiddleware from "../middlewares/timelineMiddlewares.js";

const timelineRoutes = Router();

timelineRoutes.post("/timeline", timelineMiddleware.validateSavePost, timelineController.savePost);
timelineRoutes.get("/timeline", timelineController.getTimelinePosts);
timelineRoutes.delete("/timeline", timelineController.deletePost);

export default timelineRoutes;