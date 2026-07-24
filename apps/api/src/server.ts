import express from 'express';
import cors from 'cors';
import { CONFIG } from './config.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';
import researchRoutes from './routes/researchRoutes.js';
import talentRoutes from './routes/talentRoutes.js';
import fundingRoutes from './routes/fundingRoutes.js';
import startupRoutes from './routes/startupRoutes.js';
import collaborationRoutes from './routes/collaborationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'AI-Powered Innovation Ecosystem Platform API',
    phase: 'Phase 9 - AI Engine Integration',
    country: 'Pakistan 🇵🇰',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/jobs', talentRoutes);
app.use('/api/funding', fundingRoutes);
app.use('/api', startupRoutes);
app.use('/api', collaborationRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', aiRoutes);

app.listen(CONFIG.PORT, () => {
  console.log(`🚀 [Innovation Ecosystem API] running on http://localhost:${CONFIG.PORT}`);
});
