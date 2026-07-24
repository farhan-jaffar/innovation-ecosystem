import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'innovation_ecosystem_secret_key_2026_pakistan',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'innovation_ecosystem_refresh_secret_2026_pakistan',
  JWT_EXPIRES_IN: '15m' as const,
  JWT_REFRESH_EXPIRES_IN: '7d' as const,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
