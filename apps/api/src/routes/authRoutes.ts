import { Router } from 'express';
import { register, login, logout, refreshTokenHandler, getMe, verifyEmail, forgotPassword, resetPassword, changePassword } from '../controllers/authController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateJwt, logout);
router.post('/refresh', refreshTokenHandler);
router.get('/me', authenticateJwt, getMe);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/change-password', authenticateJwt, changePassword);

export default router;
