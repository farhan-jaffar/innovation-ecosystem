import express from 'express';
import cors from 'cors';
import { CONFIG } from './config.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';
import researchRoutes from './routes/researchRoutes.js';
import talentRoutes from './routes/talentRoutes.js';
import fundingRoutes from './routes/fundingRoutes.js';

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
    phase: 'Phase 5 - Funding Marketplace',
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

app.listen(CONFIG.PORT, () => {
  console.log(`🚀 [Innovation Ecosystem API] running on http://localhost:${CONFIG.PORT}`);
});
