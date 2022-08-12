import {Router} from 'express';
import likesRoute from './likesRoutes.js';
import timelineRoutes from './timelineRoutes.js';
import userRoutes from './userRoutes.js';
const router = Router();

router.use(timelineRoutes);
router.use(userRoutes)
router.use(likesRoute)

export default router;