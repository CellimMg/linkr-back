import { Router } from "express";
import timelineController from "../controllers/timelineControllers.js";
import timelineMiddleware from "../middlewares/timelineMiddlewares.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import timelineSchemas from "../schemas/timelineSchemas.js";

const timelineRoutes = Router();

timelineRoutes.post("/timeline", timelineMiddleware.validateSavePost, timelineController.savePost);
timelineRoutes.get("/timeline", timelineController.getTimelinePosts);
timelineRoutes.delete("/timeline/:id", timelineController.deletePost);
timelineRoutes.patch("/timeline/:id", schemaValidate(timelineSchemas.validateUpdatePostSchema), timelineController.updatePost);


export default timelineRoutes;