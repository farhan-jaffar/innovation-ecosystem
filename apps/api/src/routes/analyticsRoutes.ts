import { Router } from 'express';
import { getNationalAnalytics } from '../controllers/analyticsController.js';

const router = Router();

router.get('/analytics/national', getNationalAnalytics);

export default router;
