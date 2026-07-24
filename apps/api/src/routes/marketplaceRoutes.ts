import { Router } from 'express';
import {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  applyToOpportunity,
  getOpportunityApplications,
  updateApplicationStatus,
  getMyApplications,
  toggleBookmark,
  getSavedOpportunities
} from '../controllers/marketplaceController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getOpportunities);
router.get('/saved', authenticateJwt, getSavedOpportunities);
router.get('/my-applications', authenticateJwt, getMyApplications);
router.get('/:id', getOpportunityById);

// Authenticated poster & applicant routes
router.post('/', authenticateJwt, createOpportunity);
router.put('/:id', authenticateJwt, updateOpportunity);
router.delete('/:id', authenticateJwt, deleteOpportunity);
router.post('/:id/apply', authenticateJwt, applyToOpportunity);
router.get('/:id/applications', authenticateJwt, getOpportunityApplications);
router.put('/applications/:appId', authenticateJwt, updateApplicationStatus);
router.post('/:id/bookmark', authenticateJwt, toggleBookmark);

export default router;
