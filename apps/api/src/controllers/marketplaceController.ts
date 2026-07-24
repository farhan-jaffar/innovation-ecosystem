import { Request, Response } from 'express';
import { DataStore } from '../db/store.js';
import { AuthRequest } from '../middleware/auth.js';
import { Opportunity, Application, ProjectType, OpportunityStatus, ApplicationStatus } from '@innovation/shared-types';

const store = DataStore.getInstance();

export const getOpportunities = async (req: Request, res: Response) => {
  try {
    const { type, domain, search, status, featured } = req.query;

    const opportunities = store.getAllOpportunities({
      type: type as string,
      domain: domain as string,
      search: search as string,
      status: status as string,
      featured: featured === 'true'
    });

    return res.json({
      success: true,
      data: opportunities
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch opportunities.' });
  }
};

export const getOpportunityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const opp = store.getOpportunityById(id);

    if (!opp) {
      return res.status(404).json({ success: false, error: 'Opportunity not found.' });
    }

    return res.json({
      success: true,
      data: opp
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch opportunity.' });
  }
};

export const createOpportunity = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const {
      title,
      description,
      type,
      domain,
      budget,
      currency,
      budgetType,
      deadline,
      duration,
      requiredSkills,
      requiredRoles,
      tags,
      milestones
    } = req.body;

    if (!title || !description || !type || !domain || !deadline) {
      return res.status(400).json({
        success: false,
        error: 'Title, description, type, domain, and deadline are required.'
      });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const orgName = userProfile?.organizationName || userProfile?.name || req.user.username;
    const orgLogo = userProfile?.logo || userProfile?.avatarUrl || '';

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title,
      description,
      type: type as ProjectType,
      postedBy: req.user.id,
      posterUsername: req.user.username,
      posterRole: req.user.role,
      organizationName: orgName,
      organizationLogo: orgLogo,
      domain,
      budget: budget ? parseFloat(budget) : undefined,
      currency: currency || 'PKR',
      budgetType: budgetType || 'FIXED',
      deadline,
      duration: duration || '3 Months',
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
      requiredRoles: Array.isArray(requiredRoles) ? requiredRoles : [],
      status: OpportunityStatus.OPEN,
      visibility: 'PUBLIC',
      attachments: [],
      tags: Array.isArray(tags) ? tags : [domain],
      milestones: Array.isArray(milestones) ? milestones : [],
      featured: false,
      viewCount: 0,
      applicationCount: 0,
      collaboratorCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createOpportunity(newOpp);

    return res.status(201).json({
      success: true,
      message: 'Opportunity posted successfully!',
      data: newOpp
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to create opportunity.' });
  }
};

export const updateOpportunity = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const opp = store.getOpportunityById(id);

    if (!opp) {
      return res.status(404).json({ success: false, error: 'Opportunity not found.' });
    }

    if (opp.postedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, error: 'Forbidden. You do not own this post.' });
    }

    const updated = store.updateOpportunity(id, req.body);
    return res.json({
      success: true,
      message: 'Opportunity updated successfully!',
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to update opportunity.' });
  }
};

export const deleteOpportunity = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const opp = store.getOpportunityById(id);

    if (!opp) {
      return res.status(404).json({ success: false, error: 'Opportunity not found.' });
    }

    if (opp.postedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, error: 'Forbidden.' });
    }

    store.deleteOpportunity(id);
    return res.json({ success: true, message: 'Opportunity deleted.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to delete opportunity.' });
  }
};

export const applyToOpportunity = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const opp = store.getOpportunityById(id);

    if (!opp) {
      return res.status(404).json({ success: false, error: 'Opportunity not found.' });
    }

    const { coverLetter, proposedApproach, proposedBudget, proposedTimeline, attachments } = req.body;

    if (!coverLetter || !proposedApproach) {
      return res.status(400).json({
        success: false,
        error: 'Cover letter and proposed technical approach are required.'
      });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const applicantName = userProfile?.firstName
      ? `${userProfile.firstName} ${userProfile.lastName || ''}`
      : userProfile?.name || userProfile?.organizationName || req.user.username;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      opportunityId: id,
      opportunityTitle: opp.title,
      applicantId: req.user.id,
      applicantUsername: req.user.username,
      applicantRole: req.user.role,
      applicantName,
      coverLetter,
      proposedApproach,
      proposedBudget: proposedBudget ? parseFloat(proposedBudget) : undefined,
      proposedTimeline: proposedTimeline || '3 Months',
      attachments: Array.isArray(attachments) ? attachments : [],
      status: ApplicationStatus.SUBMITTED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createApplication(newApp);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: newApp
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to submit application.' });
  }
};

export const getOpportunityApplications = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const opp = store.getOpportunityById(id);

    if (!opp) {
      return res.status(404).json({ success: false, error: 'Opportunity not found.' });
    }

    if (opp.postedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, error: 'Forbidden. Poster access only.' });
    }

    const apps = store.getApplicationsForOpportunity(id);
    return res.json({
      success: true,
      data: apps
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch applications.' });
  }
};

export const updateApplicationStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { appId } = req.params;
    const { status, reviewNotes } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required.' });
    }

    const updated = store.updateApplicationStatus(appId, status as ApplicationStatus, reviewNotes, req.user.username);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Application not found.' });
    }

    return res.json({
      success: true,
      message: `Application status updated to ${status}`,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to update application.' });
  }
};

export const getMyApplications = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const apps = store.getApplicationsForUser(req.user.id);
    return res.json({
      success: true,
      data: apps
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch my applications.' });
  }
};

export const toggleBookmark = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const result = store.toggleBookmark(req.user.id, id);

    return res.json({
      success: true,
      bookmarked: result.bookmarked,
      message: result.bookmarked ? 'Opportunity saved to bookmarks' : 'Removed from bookmarks'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to bookmark.' });
  }
};

export const getSavedOpportunities = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const saved = store.getUserBookmarks(req.user.id);
    return res.json({
      success: true,
      data: saved
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch bookmarks.' });
  }
};
