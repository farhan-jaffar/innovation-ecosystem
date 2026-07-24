import { Request, Response } from 'express';
import { DataStore } from '../db/store.js';
import { AuthRequest } from '../middleware/auth.js';
import { JobPosting, JobApplication, UniversityRecommendation, JobType, ExperienceLevel, JobStatus, JobApplicationStatus } from '@innovation/shared-types';

const store = DataStore.getInstance();

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { type, domain, experienceLevel, remote, search } = req.query;

    const jobs = store.getAllJobs({
      type: type as string,
      domain: domain as string,
      experienceLevel: experienceLevel as string,
      remote: remote === 'true',
      search: search as string
    });

    return res.json({
      success: true,
      data: jobs
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch job postings.' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = store.getJobById(id);

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job posting not found.' });
    }

    return res.json({
      success: true,
      data: job
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch job detail.' });
  }
};

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const {
      title,
      description,
      type,
      domain,
      requiredSkills,
      preferredSkills,
      experienceLevel,
      salaryMin,
      salaryMax,
      currency,
      salaryType,
      location,
      remote,
      hybrid,
      applicationDeadline,
      perks,
      responsibilities,
      requirements
    } = req.body;

    if (!title || !description || !domain || !applicationDeadline) {
      return res.status(400).json({ success: false, error: 'Title, description, domain, and deadline are required.' });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const companyName = userProfile?.organizationName || userProfile?.name || req.user.username;
    const companyLogo = userProfile?.logo || '';

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      companyId: req.user.id,
      companyName,
      companyLogo,
      title,
      description,
      type: (type as JobType) || JobType.FULL_TIME,
      domain,
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
      preferredSkills: Array.isArray(preferredSkills) ? preferredSkills : [],
      experienceLevel: (experienceLevel as ExperienceLevel) || ExperienceLevel.MID,
      salaryMin: salaryMin ? parseFloat(salaryMin) : undefined,
      salaryMax: salaryMax ? parseFloat(salaryMax) : undefined,
      currency: currency || 'PKR',
      salaryType: salaryType || 'MONTHLY',
      location: location || 'Islamabad / Remote',
      remote: remote === true,
      hybrid: hybrid === true,
      applicationDeadline,
      perks: Array.isArray(perks) ? perks : [],
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      requirements: Array.isArray(requirements) ? requirements : [],
      status: JobStatus.ACTIVE,
      viewCount: 0,
      applicantCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createJob(newJob);

    return res.status(201).json({
      success: true,
      message: 'Job position posted successfully!',
      data: newJob
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to create job posting.' });
  }
};

export const applyToJob = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const job = store.getJobById(id);

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found.' });
    }

    const { coverLetter, resumeUrl } = req.body;

    if (!coverLetter) {
      return res.status(400).json({ success: false, error: 'Cover letter is required.' });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const applicantName = userProfile?.firstName
      ? `${userProfile.firstName} ${userProfile.lastName || ''}`
      : userProfile?.name || req.user.username;

    const newApp: JobApplication = {
      id: `japp-${Date.now()}`,
      jobId: id,
      jobTitle: job.title,
      companyName: job.companyName,
      applicantId: req.user.id,
      applicantUsername: req.user.username,
      applicantName,
      applicantEmail: req.user.email,
      coverLetter,
      resumeUrl: resumeUrl || '',
      status: JobApplicationStatus.APPLIED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createJobApplication(newApp);

    return res.status(201).json({
      success: true,
      message: 'Job application submitted successfully!',
      data: newApp
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to submit application.' });
  }
};

export const getJobApplications = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const job = store.getJobById(id);

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found.' });
    }

    if (job.companyId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, error: 'Forbidden.' });
    }

    const apps = store.getApplicationsForJob(id);
    return res.json({
      success: true,
      data: apps
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch applications.' });
  }
};

export const updateJobApplicationStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { appId } = req.params;
    const { status, notes, interviewDate } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required.' });
    }

    const updated = store.updateJobApplicationStatus(appId, status as JobApplicationStatus, notes, interviewDate);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Application not found.' });
    }

    return res.json({
      success: true,
      message: `Applicant status updated to ${status}`,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to update application.' });
  }
};

export const recommendStudent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const { studentUsername, note } = req.body;

    if (!studentUsername || !note) {
      return res.status(400).json({ success: false, error: 'Student username and endorsement note are required.' });
    }

    const student = store.findUserByUsername(studentUsername);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student user not found.' });
    }

    const job = store.getJobById(id);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found.' });
    }

    const currentUser = store.findUserById(req.user.id);
    const uniProfile = currentUser?.profile as any;

    const rec: UniversityRecommendation = {
      id: `rec-${Date.now()}`,
      jobId: id,
      jobTitle: job.title,
      universityId: req.user.id,
      universityName: uniProfile?.name || req.user.username,
      studentId: student.id,
      studentName: student.username,
      note,
      createdAt: new Date().toISOString()
    };

    store.addUniversityRecommendation(rec);

    return res.status(201).json({
      success: true,
      message: `Official University Endorsement submitted for @${studentUsername}!`,
      data: rec
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to submit recommendation.' });
  }
};

export const getTalentFeed = async (req: Request, res: Response) => {
  try {
    const { search, skill } = req.query;
    const talent = store.getAllTalent({
      search: search as string,
      skill: skill as string
    });

    return res.json({
      success: true,
      data: talent
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch talent feed.' });
  }
};
