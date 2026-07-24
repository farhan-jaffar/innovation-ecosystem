export enum UserRole {
  GOVERNMENT = 'GOVERNMENT',
  UNIVERSITY = 'UNIVERSITY',
  COMPANY = 'COMPANY',
  INDIVIDUAL = 'INDIVIDUAL',
  ADMIN = 'ADMIN'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  SUSPENDED = 'SUSPENDED'
}

export enum IndividualAvailability {
  OPEN_TO_WORK = 'OPEN_TO_WORK',
  BUSY = 'BUSY',
  NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export enum CompanyStage {
  STARTUP = 'STARTUP',
  SME = 'SME',
  ENTERPRISE = 'ENTERPRISE'
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: GovernmentProfile | UniversityProfile | CompanyProfile | IndividualProfile;
}

export interface GovernmentProfile {
  id: string;
  userId: string;
  organizationName: string;
  ministry: string;
  jurisdiction: string;
  website?: string;
  logo?: string;
  contactEmail: string;
  contactPhone?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  nationalFocusAreas: string[];
}

export interface UniversityProfile {
  id: string;
  userId: string;
  name: string;
  country: string;
  city: string;
  ranking?: string;
  accreditation?: string;
  departments: string[];
  facultiesCount?: number;
  labsCount?: number;
  incubators: string[];
  website?: string;
  logo?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface CompanyProfile {
  id: string;
  userId: string;
  name: string;
  industry: string;
  size: string;
  stage: CompanyStage;
  description: string;
  website?: string;
  logo?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  techStack: string[];
}

export interface IndividualProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  headline: string;
  bio: string;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: number;
    endYear?: number;
  }>;
  experience: Array<{
    company: string;
    title: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }>;
  skills: string[];
  researchInterests: string[];
  githubUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  logo?: string;
  avatarUrl?: string;
  availability: IndividualAvailability;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
