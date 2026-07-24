import { Router } from 'express';
import { globalSearch } from '../controllers/searchController.js';

const router = Router();

router.get('/search', globalSearch);

export default router;
