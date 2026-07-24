import { Request, Response } from 'express';
import { DataStore } from '../db/store.js';
import { AuthRequest } from '../middleware/auth.js';
import {
  FundingOpportunity,
  FundingProposal,
  FundedProject,
  FundingType,
  FundingEligibility,
  FundingOpportunityStatus,
  FundingProposalStatus
} from '@innovation/shared-types';

const store = DataStore.getInstance();

export const getFundingOpportunities = async (req: Request, res: Response) => {
  try {
    const { type, eligibility, domain, search } = req.query;

    const list = store.getAllFunding({
      type: type as string,
      eligibility: eligibility as string,
      domain: domain as string,
      search: search as string
    });

    return res.json({
      success: true,
      data: list
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch funding opportunities.' });
  }
};

export const getFundingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = store.getFundingById(id);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Funding opportunity not found.' });
    }

    return res.json({
      success: true,
      data: item
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch funding detail.' });
  }
};

export const createFundingOpportunity = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const {
      title,
      description,
      type,
      amount,
      currency,
      fundingType,
      eligibility,
      domain,
      requirements,
      applicationDeadline,
      documentsRequired
    } = req.body;

    if (!title || !description || !amount || !domain || !applicationDeadline) {
      return res.status(400).json({ success: false, error: 'Title, description, amount, domain, and deadline are required.' });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const organizationName = userProfile?.organizationName || userProfile?.name || req.user.username;
    const organizationLogo = userProfile?.logo || '';

    const newFunding: FundingOpportunity = {
      id: `fund-${Date.now()}`,
      funderId: req.user.id,
      funderUsername: req.user.username,
      funderRole: req.user.role,
      organizationName,
      organizationLogo,
      title,
      description,
      type: (type as FundingType) || FundingType.GRANT,
      amount: parseFloat(amount),
      currency: currency || 'PKR',
      fundingType: fundingType || 'MILESTONE_BASED',
      eligibility: (eligibility as FundingEligibility) || FundingEligibility.ANY,
      domain,
      requirements: Array.isArray(requirements) ? requirements : [],
      applicationDeadline,
      documentsRequired: Array.isArray(documentsRequired) ? documentsRequired : [],
      status: FundingOpportunityStatus.OPEN,
      viewCount: 0,
      proposalCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createFunding(newFunding);

    return res.status(201).json({
      success: true,
      message: 'Funding opportunity published successfully!',
      data: newFunding
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to publish funding opportunity.' });
  }
};

export const submitProposal = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const funding = store.getFundingById(id);

    if (!funding) {
      return res.status(404).json({ success: false, error: 'Funding opportunity not found.' });
    }

    const { proposalTitle, proposalDescription, budget, timeline, milestones, teamMembers, attachments } = req.body;

    if (!proposalTitle || !proposalDescription || !budget) {
      return res.status(400).json({ success: false, error: 'Proposal title, description, and budget are required.' });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const applicantName = userProfile?.organizationName || userProfile?.name || req.user.username;

    const prop: FundingProposal = {
      id: `fprop-${Date.now()}`,
      fundingId: id,
      fundingTitle: funding.title,
      applicantId: req.user.id,
      applicantUsername: req.user.username,
      applicantRole: req.user.role,
      applicantName,
      proposalTitle,
      proposalDescription,
      budget: parseFloat(budget),
      timeline: timeline || '12 Months',
      milestones: Array.isArray(milestones) ? milestones : [],
      teamMembers: Array.isArray(teamMembers) ? teamMembers : [req.user.username],
      attachments: Array.isArray(attachments) ? attachments : [],
      status: FundingProposalStatus.SUBMITTED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createFundingProposal(prop);

    return res.status(201).json({
      success: true,
      message: 'Grant proposal submitted successfully!',
      data: prop
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to submit proposal.' });
  }
};

export const getProposalsForFunding = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const funding = store.getFundingById(id);

    if (!funding) {
      return res.status(404).json({ success: false, error: 'Funding opportunity not found.' });
    }

    if (funding.funderId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, error: 'Forbidden.' });
    }

    const proposals = store.getProposalsForFunding(id);
    return res.json({
      success: true,
      data: proposals
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch proposals.' });
  }
};

export const updateProposalStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { proposalId } = req.params;
    const { status, reviewerNotes, approvedAmount } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required.' });
    }

    const updated = store.updateFundingProposalStatus(
      proposalId,
      status as FundingProposalStatus,
      reviewerNotes,
      approvedAmount ? parseFloat(approvedAmount) : undefined
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Proposal not found.' });
    }

    return res.json({
      success: true,
      message: `Proposal evaluation status updated to ${status}`,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to update proposal.' });
  }
};

export const getMyGrantProposals = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const list = store.getProposalsForApplicant(req.user.id);
    return res.json({
      success: true,
      data: list
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch user proposals.' });
  }
};

export const getFundedProjects = async (req: Request, res: Response) => {
  try {
    const projects = store.getAllFundedProjects();
    return res.json({
      success: true,
      data: projects
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch funded projects.' });
  }
};

export const getFundedProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const proj = store.getFundedProjectById(id);

    if (!proj) {
      return res.status(404).json({ success: false, error: 'Funded project tracker not found.' });
    }

    return res.json({
      success: true,
      data: proj
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch project tracker.' });
  }
};

export const updateProjectMilestone = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const { milestoneIndex, newStatus, releaseDisbursementAmount } = req.body;

    const updated = store.updateFundedProjectMilestone(
      id,
      parseInt(milestoneIndex),
      newStatus,
      releaseDisbursementAmount ? parseFloat(releaseDisbursementAmount) : undefined
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }

    return res.json({
      success: true,
      message: 'Milestone progress updated & disbursement released!',
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to update milestone.' });
  }
};
