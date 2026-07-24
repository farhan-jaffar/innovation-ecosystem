import { Router } from 'express';
import {
  getAllResearch,
  getResearchById,
  createResearch,
  trackDownload,
  sendCollabInquiry
} from '../controllers/researchController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllResearch);
router.get('/:id', getResearchById);
router.post('/', authenticateJwt, createResearch);
router.post('/:id/download', trackDownload);
router.post('/:id/collab', authenticateJwt, sendCollabInquiry);

export default router;
