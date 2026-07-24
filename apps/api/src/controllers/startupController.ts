import { Request, Response } from 'express';
import { DataStore } from '../db/store.js';
import { AuthRequest } from '../middleware/auth.js';
import { Startup, MentorProfile, InvestorProfile, MentorshipRequest, StartupStage, OriginType, MentorshipStatus } from '@innovation/shared-types';

const store = DataStore.getInstance();

export const getStartups = async (req: Request, res: Response) => {
  try {
    const { stage, industry, originType, search } = req.query;

    const list = store.getAllStartups({
      stage: stage as string,
      industry: industry as string,
      originType: originType as string,
      search: search as string
    });

    return res.json({
      success: true,
      data: list
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch startups.' });
  }
};

export const getStartupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const startup = store.getStartupById(id);

    if (!startup) {
      return res.status(404).json({ success: false, error: 'Startup profile not found.' });
    }

    return res.json({
      success: true,
      data: startup
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch startup detail.' });
  }
};

export const createStartup = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const {
      name,
      tagline,
      description,
      industry,
      stage,
      city,
      logo,
      website,
      pitchDeckUrl,
      demoUrl,
      teamSize,
      revenueRange,
      fundingRaised,
      originType,
      linkedResearchIds,
      linkedUniversityId,
      universityName
    } = req.body;

    if (!name || !tagline || !description || !industry) {
      return res.status(400).json({ success: false, error: 'Name, tagline, description, and industry are required.' });
    }

    const newStartup: Startup = {
      id: `start-${Date.now()}`,
      founderIds: [req.user.id],
      founderUsernames: [req.user.username],
      name,
      tagline,
      description,
      industry,
      stage: (stage as StartupStage) || StartupStage.MVP,
      foundedDate: new Date().toISOString().split('T')[0],
      country: 'Pakistan',
      city: city || 'Islamabad',
      logo: logo || '',
      website: website || '',
      pitchDeckUrl: pitchDeckUrl || '',
      demoUrl: demoUrl || '',
      teamSize: teamSize ? parseInt(teamSize) : 2,
      revenueRange: revenueRange || 'PRE_REVENUE',
      fundingRaised: fundingRaised ? parseFloat(fundingRaised) : 0,
      currency: 'PKR',
      originType: (originType as OriginType) || OriginType.UNIVERSITY_RESEARCH,
      linkedResearchIds: Array.isArray(linkedResearchIds) ? linkedResearchIds : [],
      linkedUniversityId: linkedUniversityId || '',
      universityName: universityName || 'FAST National University',
      status: 'ACTIVE',
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createStartup(newStartup);

    return res.status(201).json({
      success: true,
      message: 'Startup profile registered successfully!',
      data: newStartup
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to register startup.' });
  }
};

export const getMentors = async (req: Request, res: Response) => {
  try {
    const { expertise, search } = req.query;
    const mentors = store.getAllMentors({
      expertise: expertise as string,
      search: search as string
    });

    return res.json({
      success: true,
      data: mentors
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch mentors.' });
  }
};

export const getInvestors = async (req: Request, res: Response) => {
  try {
    const { domain, stage } = req.query;
    const investors = store.getAllInvestors({
      domain: domain as string,
      stage: stage as string
    });

    return res.json({
      success: true,
      data: investors
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch investors.' });
  }
};

export const requestMentorship = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { startupId, mentorId, message } = req.body;

    if (!startupId || !mentorId || !message) {
      return res.status(400).json({ success: false, error: 'Startup ID, mentor ID, and message are required.' });
    }

    const startup = store.getStartupById(startupId);
    if (!startup) {
      return res.status(404).json({ success: false, error: 'Startup not found.' });
    }

    const mentor = store.getAllMentors().find(m => m.id === mentorId);

    const newReq: MentorshipRequest = {
      id: `mreq-${Date.now()}`,
      startupId,
      startupName: startup.name,
      mentorId,
      mentorName: mentor?.fullName || 'Mentor',
      message,
      status: MentorshipStatus.PENDING,
      createdAt: new Date().toISOString()
    };

    store.createMentorshipRequest(newReq);

    return res.status(201).json({
      success: true,
      message: 'Mentorship request sent directly to mentor!',
      data: newReq
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to send mentorship request.' });
  }
};
