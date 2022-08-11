import {Router} from 'express';
import timelineRoutes from './timelineRoutes.js';

const router = Router();

router.use(timelineRoutes);

export default router;