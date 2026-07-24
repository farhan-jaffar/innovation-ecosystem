import { Router } from 'express';
import { getProfileByUsername, updateProfile, getAllProfiles, uploadAvatar, deleteAccount } from '../controllers/profileController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.get('/all', getAllProfiles);
router.get('/:username', getProfileByUsername);
router.put('/', authenticateJwt, updateProfile);
router.post('/me/avatar', authenticateJwt, uploadAvatar);
router.delete('/me', authenticateJwt, deleteAccount);

export default router;
