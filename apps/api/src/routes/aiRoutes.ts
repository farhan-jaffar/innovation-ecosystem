import { Router } from 'express';
import {
  extractSkills,
  recommendTalent,
  analyzeProposal,
  chatAssistant
} from '../controllers/aiController.js';

const router = Router();

router.post('/ai/extract-skills', extractSkills);
router.post('/ai/recommend/talent', recommendTalent);
router.post('/ai/proposal-analysis', analyzeProposal);
router.post('/ai/chat', chatAssistant);

export default router;
