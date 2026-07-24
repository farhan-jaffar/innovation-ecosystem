import { Request, Response } from 'express';
import { DataStore } from '../db/store.js';

const store = DataStore.getInstance();

export const getNationalAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = store.getNationalAnalytics();
    return res.json({
      success: true,
      data: analytics
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch national analytics.' });
  }
};
