import { Response } from 'express';
import { DataStore } from '../db/store.js';
import { AuthRequest } from '../middleware/auth.js';
import { UserRole } from '@innovation/shared-types';

const store = DataStore.getInstance();

export const calculateProfileCompleteness = (user: any): number => {
  if (!user || !user.profile) return 20;
  let filledFields = 2; // email, role
  let totalFields = 2;

  const prof = user.profile;

  if (user.role === UserRole.INDIVIDUAL) {
    totalFields += 8;
    if (prof.firstName) filledFields++;
    if (prof.headline) filledFields++;
    if (prof.bio) filledFields++;
    if (prof.skills && prof.skills.length > 0) filledFields++;
    if (prof.researchInterests && prof.researchInterests.length > 0) filledFields++;
    if (prof.education && prof.education.length > 0) filledFields++;
    if (prof.experience && prof.experience.length > 0) filledFields++;
    if (prof.githubUrl || prof.linkedinUrl) filledFields++;
  } else if (user.role === UserRole.GOVERNMENT) {
    totalFields += 5;
    if (prof.organizationName) filledFields++;
    if (prof.ministry) filledFields++;
    if (prof.jurisdiction) filledFields++;
    if (prof.contactEmail) filledFields++;
    if (prof.nationalFocusAreas && prof.nationalFocusAreas.length > 0) filledFields++;
  } else if (user.role === UserRole.UNIVERSITY) {
    totalFields += 6;
    if (prof.name) filledFields++;
    if (prof.city) filledFields++;
    if (prof.ranking) filledFields++;
    if (prof.departments && prof.departments.length > 0) filledFields++;
    if (prof.incubators && prof.incubators.length > 0) filledFields++;
    if (prof.website) filledFields++;
  } else if (user.role === UserRole.COMPANY) {
    totalFields += 6;
    if (prof.name) filledFields++;
    if (prof.industry) filledFields++;
    if (prof.description) filledFields++;
    if (prof.size) filledFields++;
    if (prof.techStack && prof.techStack.length > 0) filledFields++;
    if (prof.website) filledFields++;
  }

  return Math.round((filledFields / totalFields) * 100);
};

export const getProfileByUsername = async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.params;
    const user = store.findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User profile not found.' });
    }

    const completeness = calculateProfileCompleteness(user);

    return res.json({
      success: true,
      data: {
        ...user,
        completeness
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to retrieve profile.' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const user = store.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const { profileData } = req.body;
    if (!profileData) {
      return res.status(400).json({ success: false, error: 'profileData is required.' });
    }

    user.profile = {
      ...user.profile,
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    user.updatedAt = new Date().toISOString();

    store.updateUser(user);

    const completeness = calculateProfileCompleteness(user);

    return res.json({
      success: true,
      message: 'Profile updated successfully!',
      data: {
        ...user,
        completeness
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to update profile.' });
  }
};

export const getAllProfiles = async (req: AuthRequest, res: Response) => {
  try {
    const users = store.getAllUsers();
    const usersWithCompleteness = users.map(u => ({
      ...u,
      completeness: calculateProfileCompleteness(u)
    }));
    return res.json({
      success: true,
      data: usersWithCompleteness
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch profiles.' });
  }
};

export const uploadAvatar = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { avatarUrl } = req.body;
    if (!avatarUrl) {
      return res.status(400).json({ success: false, error: 'avatarUrl is required.' });
    }

    const updated = store.updateAvatar(req.user.id, avatarUrl);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    return res.json({
      success: true,
      message: 'Avatar uploaded successfully!',
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to upload avatar.' });
  }
};

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const deleted = store.deleteUser(req.user.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    return res.json({
      success: true,
      message: 'Account deleted successfully.'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to delete account.' });
  }
};
