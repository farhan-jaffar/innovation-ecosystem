import { Router } from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  applyToJob,
  getJobApplications,
  updateJobApplicationStatus,
  recommendStudent,
  getTalentFeed
} from '../controllers/talentController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.get('/', getJobs);
router.get('/talent-feed', getTalentFeed);
router.get('/:id', getJobById);
router.post('/', authenticateJwt, createJob);
router.post('/:id/apply', authenticateJwt, applyToJob);
router.get('/:id/applications', authenticateJwt, getJobApplications);
router.put('/applications/:appId', authenticateJwt, updateJobApplicationStatus);
router.post('/:id/recommend', authenticateJwt, recommendStudent);

export default router;
