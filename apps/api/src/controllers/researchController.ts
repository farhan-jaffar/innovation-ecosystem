import { Request, Response } from 'express';
import { DataStore } from '../db/store.js';
import { AuthRequest } from '../middleware/auth.js';
import { Research, ResearchCollabInquiry, PublicationType, AccessType, ResearchStatus } from '@innovation/shared-types';

const store = DataStore.getInstance();

export const getAllResearch = async (req: Request, res: Response) => {
  try {
    const { domain, publicationType, search, fundingRequest, collaborationOpen, authorUsername } = req.query;

    const researchList = store.getAllResearch({
      domain: domain as string,
      publicationType: publicationType as string,
      search: search as string,
      fundingRequest: fundingRequest === 'true',
      collaborationOpen: collaborationOpen === 'true',
      authorUsername: authorUsername as string
    });

    return res.json({
      success: true,
      data: researchList
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch research items.' });
  }
};

export const getResearchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const research = store.getResearchById(id);

    if (!research) {
      return res.status(404).json({ success: false, error: 'Research item not found.' });
    }

    return res.json({
      success: true,
      data: research
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch research detail.' });
  }
};

export const createResearch = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const {
      title,
      abstract,
      pdfUrl,
      authors,
      affiliations,
      domain,
      subDomain,
      keywords,
      publicationType,
      journalName,
      doi,
      externalUrl,
      license,
      accessType,
      collaborationOpen,
      fundingRequest,
      fundingAmount
    } = req.body;

    if (!title || !abstract || !domain) {
      return res.status(400).json({ success: false, error: 'Title, abstract, and domain are required.' });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const orgName = userProfile?.organizationName || userProfile?.name || userProfile?.institution || req.user.username;

    const newResearch: Research = {
      id: `res-${Date.now()}`,
      title,
      abstract,
      pdfUrl: pdfUrl || '',
      authors: Array.isArray(authors) ? authors : [currentUser?.username || req.user.username],
      affiliations: Array.isArray(affiliations) ? affiliations : [orgName],
      domain,
      subDomain: subDomain || '',
      keywords: Array.isArray(keywords) ? keywords : [domain],
      publicationType: (publicationType as PublicationType) || PublicationType.PAPER,
      publishedDate: new Date().toISOString().split('T')[0],
      journalName: journalName || 'National Innovation Repository',
      doi: doi || `10.5281/zenodo.${Date.now()}`,
      externalUrl: externalUrl || '',
      license: license || 'CC BY 4.0',
      accessType: (accessType as AccessType) || AccessType.OPEN,
      citations: 0,
      downloads: 0,
      views: 0,
      collaborationOpen: collaborationOpen !== false,
      fundingRequest: fundingRequest === true,
      fundingAmount: fundingAmount ? parseFloat(fundingAmount) : undefined,
      status: ResearchStatus.PUBLISHED,
      postedBy: req.user.id,
      posterUsername: req.user.username,
      posterRole: req.user.role,
      organizationName: orgName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createResearch(newResearch);

    return res.status(201).json({
      success: true,
      message: 'Research published successfully!',
      data: newResearch
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to publish research.' });
  }
};

export const trackDownload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = store.incrementDownload(id);

    return res.json({
      success: true,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to track download.' });
  }
};

export const sendCollabInquiry = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const research = store.getResearchById(id);

    if (!research) {
      return res.status(404).json({ success: false, error: 'Research not found.' });
    }

    const { inquiryType, message, contactEmail } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Inquiry message is required.' });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const inquirerOrgName = userProfile?.organizationName || userProfile?.name || req.user.username;

    const inquiry: ResearchCollabInquiry = {
      id: `inq-${Date.now()}`,
      researchId: id,
      researchTitle: research.title,
      inquirerId: req.user.id,
      inquirerUsername: req.user.username,
      inquirerRole: req.user.role,
      inquirerOrgName,
      inquiryType: inquiryType || 'COMMERCIALIZATION',
      message,
      contactEmail: contactEmail || req.user.email,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    store.createCollabInquiry(inquiry);

    return res.status(201).json({
      success: true,
      message: 'Collaboration inquiry sent to author!',
      data: inquiry
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to send collaboration inquiry.' });
  }
};
