import { Router } from 'express';
import {
  getFundingOpportunities,
  getFundingById,
  createFundingOpportunity,
  submitProposal,
  getProposalsForFunding,
  updateProposalStatus,
  getMyGrantProposals,
  getFundedProjects,
  getFundedProjectById,
  updateProjectMilestone
} from '../controllers/fundingController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.get('/', getFundingOpportunities);
router.get('/my-proposals', authenticateJwt, getMyGrantProposals);
router.get('/funded-projects', getFundedProjects);
router.get('/funded-projects/:id', getFundedProjectById);
router.put('/funded-projects/:id/milestone', authenticateJwt, updateProjectMilestone);
router.get('/:id', getFundingById);
router.post('/', authenticateJwt, createFundingOpportunity);
router.post('/:id/proposal', authenticateJwt, submitProposal);
router.get('/:id/proposals', authenticateJwt, getProposalsForFunding);
router.put('/proposals/:proposalId', authenticateJwt, updateProposalStatus);

export default router;
