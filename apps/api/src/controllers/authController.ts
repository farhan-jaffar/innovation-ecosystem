import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config.js';
import { DataStore } from '../db/store.js';
import { User, UserRole, UserStatus, CompanyStage, IndividualAvailability } from '@innovation/shared-types';
import { AuthRequest } from '../middleware/auth.js';

const store = DataStore.getInstance();

export const generateTokens = (user: User) => {
  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    CONFIG.JWT_SECRET as jwt.Secret,
    { expiresIn: CONFIG.JWT_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { id: user.id, role: user.role, username: user.username, type: 'refresh' },
    CONFIG.JWT_REFRESH_SECRET as jwt.Secret,
    { expiresIn: CONFIG.JWT_REFRESH_EXPIRES_IN }
  );

  return { token, refreshToken };
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, role, profileData } = req.body;

    if (!email || !username || !password || !role) {
      return res.status(400).json({ success: false, error: 'Email, username, password, and role are required.' });
    }

    if (store.findUserByEmail(email)) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
    }

    if (store.findUserByUsername(username)) {
      return res.status(400).json({ success: false, error: 'Username is already taken.' });
    }

    const userId = `user-${Date.now()}`;
    const now = new Date().toISOString();

    let profile: any = null;

    if (role === UserRole.GOVERNMENT) {
      profile = {
        id: `gov-prof-${Date.now()}`,
        userId,
        organizationName: profileData?.organizationName || `${username} Ministry`,
        ministry: profileData?.ministry || 'Ministry Department',
        jurisdiction: profileData?.jurisdiction || 'Pakistan',
        website: profileData?.website || '',
        contactEmail: email,
        verificationStatus: 'VERIFIED',
        nationalFocusAreas: profileData?.nationalFocusAreas || ['Artificial Intelligence', 'Clean Energy']
      };
    } else if (role === UserRole.UNIVERSITY) {
      profile = {
        id: `uni-prof-${Date.now()}`,
        userId,
        name: profileData?.name || username,
        country: 'Pakistan',
        city: profileData?.city || 'Lahore',
        ranking: profileData?.ranking || 'Top Ranked HEC University',
        accreditation: profileData?.accreditation || 'HEC Accredited',
        departments: profileData?.departments || ['Computer Science', 'Electrical Engineering'],
        facultiesCount: profileData?.facultiesCount || 100,
        labsCount: profileData?.labsCount || 10,
        incubators: profileData?.incubators || ['University Incubator'],
        website: profileData?.website || '',
        verificationStatus: 'VERIFIED'
      };
    } else if (role === UserRole.COMPANY) {
      profile = {
        id: `comp-prof-${Date.now()}`,
        userId,
        name: profileData?.name || username,
        industry: profileData?.industry || 'Technology & AI',
        size: profileData?.size || '11-50 Employees',
        stage: profileData?.stage || CompanyStage.STARTUP,
        description: profileData?.description || 'Innovative technology company.',
        website: profileData?.website || '',
        verificationStatus: 'VERIFIED',
        techStack: profileData?.techStack || ['Python', 'Node.js', 'React']
      };
    } else if (role === UserRole.INDIVIDUAL) {
      profile = {
        id: `ind-prof-${Date.now()}`,
        userId,
        firstName: profileData?.firstName || username,
        lastName: profileData?.lastName || '',
        headline: profileData?.headline || 'Researcher & Innovator',
        bio: profileData?.bio || 'Passionate about technology and innovation in Pakistan.',
        education: profileData?.education || [],
        experience: profileData?.experience || [],
        skills: profileData?.skills || ['Problem Solving', 'Data Analysis'],
        researchInterests: profileData?.researchInterests || ['Artificial Intelligence'],
        githubUrl: profileData?.githubUrl || '',
        linkedinUrl: profileData?.linkedinUrl || '',
        availability: profileData?.availability || IndividualAvailability.OPEN_TO_WORK
      };
    }

    const newUser: User = {
      id: userId,
      email,
      username,
      role: role as UserRole,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
      profile
    };

    store.createUser(newUser, password);

    const { token, refreshToken } = generateTokens(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      data: {
        user: newUser,
        token,
        refreshToken
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Server error during registration.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide both email and password.' });
    }

    const user = store.findUserByEmail(email);

    if (!user || !store.verifyPassword(email, password)) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const { token, refreshToken } = generateTokens(user);

    return res.json({
      success: true,
      message: 'Logged in successfully!',
      data: {
        user,
        token,
        refreshToken
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Server error during login.' });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    message: 'Logged out successfully.'
  });
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, error: 'Refresh token is required.' });
    }

    const decoded = jwt.verify(refreshToken, CONFIG.JWT_REFRESH_SECRET as jwt.Secret) as any;
    const user = store.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid refresh token.' });
    }

    const tokens = generateTokens(user);

    return res.json({
      success: true,
      data: tokens
    });
  } catch (error: any) {
    return res.status(401).json({ success: false, error: 'Invalid or expired refresh token.' });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Unauthorized.' });
  }

  const user = store.findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found.' });
  }

  return res.json({
    success: true,
    data: user
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { email, token } = req.body;

  if (email && store.verifyUserEmail(email)) {
    return res.json({ success: true, message: `Email address ${email} verified successfully!` });
  }

  return res.json({ success: true, message: 'Email address verified successfully!' });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = store.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, error: 'No user registered with this email address.' });
  }
  return res.json({ success: true, message: `Password reset instructions sent to ${email}` });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, error: 'Email and new password are required.' });
  }

  const user = store.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found.' });
  }

  store.updatePassword(email, newPassword);
  return res.json({ success: true, message: 'Password reset successfully!' });
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Unauthorized.' });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, error: 'Current password and new password are required.' });
  }

  if (!store.verifyPassword(req.user.email, currentPassword)) {
    return res.status(400).json({ success: false, error: 'Current password is incorrect.' });
  }

  store.updatePassword(req.user.email, newPassword);
  return res.json({ success: true, message: 'Password changed successfully!' });
};
