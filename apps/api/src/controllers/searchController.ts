import { Request, Response } from 'express';
import { DataStore } from '../db/store.js';

const store = DataStore.getInstance();

export const globalSearch = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const queryStr = (q as string || '').toLowerCase().trim();

    if (!queryStr) {
      return res.json({
        success: true,
        data: {
          opportunities: [],
          researches: [],
          jobs: [],
          funding: [],
          startups: [],
          talent: []
        }
      });
    }

    const opportunities = store.getAllOpportunities({ search: queryStr });
    const researches = store.getAllResearch({ search: queryStr });
    const jobs = store.getAllJobs({ search: queryStr });
    const funding = store.getAllFunding({ search: queryStr });
    const startups = store.getAllStartups({ search: queryStr });
    const talent = store.getAllTalent({ search: queryStr });

    return res.json({
      success: true,
      data: {
        opportunities,
        researches,
        jobs,
        funding,
        startups,
        talent
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Global search failed.' });
  }
};
