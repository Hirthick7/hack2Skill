import { Router } from 'express';
import carbonRoutes from './carbon.routes';
import aiRoutes from './ai.routes';
import challengeRoutes from './challenge.routes';

const router = Router();

router.use('/carbon', carbonRoutes);
router.use('/ai', aiRoutes);
router.use('/challenges', challengeRoutes);

export default router;
