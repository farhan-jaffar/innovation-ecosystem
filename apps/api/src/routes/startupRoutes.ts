import { Router } from 'express';
import {
  getStartups,
  getStartupById,
  createStartup,
  getMentors,
  getInvestors,
  requestMentorship
} from '../controllers/startupController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.get('/startups', getStartups);
router.get('/startups/:id', getStartupById);
router.post('/startups', authenticateJwt, createStartup);
router.get('/mentors', getMentors);
router.get('/investors', getInvestors);
router.post('/mentorship/request', authenticateJwt, requestMentorship);

export default router;
