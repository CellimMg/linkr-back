import {Router} from 'express';
import likesRoute from './likesRoutes.js';
import timelineRoutes from './timelineRoutes.js';
import userRoutes from './userRoutes.js';
import hashtagRouter from './hashtagRoutes.js';

const router = Router();

router.use(timelineRoutes);
router.use(userRoutes);
router.use(likesRoute);
router.use(hashtagRouter);


export default router;