import { Router } from "express";
import timelineController from "../controllers/timelineControllers.js";
import timelineMiddleware from "../middlewares/timelineMiddlewares.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import timelineSchemas from "../schemas/timelineSchemas.js";
import { tokenValidation } from '../middlewares/authMiddleware.js';

const timelineRoutes = Router();

timelineRoutes.post("/timeline", tokenValidation, timelineMiddleware.validateSavePost, timelineController.savePost);
timelineRoutes.get("/timeline", tokenValidation, timelineController.getTimelinePosts);
timelineRoutes.delete("/timeline/:id", tokenValidation, timelineController.deletePost);
timelineRoutes.patch("/timeline/:id", tokenValidation, schemaValidate(timelineSchemas.validateUpdatePostSchema), timelineController.updatePost);

export default timelineRoutes;