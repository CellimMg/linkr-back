import {Router} from 'express';
import timelineRoutes from './timelineRoutes.js';
import userRoutes from './userRoutes.js';
const router = Router();

router.use(timelineRoutes);
router.use(userRoutes)

export default router;