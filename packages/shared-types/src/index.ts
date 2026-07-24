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

export enum ProjectType {
  GOVERNMENT_CHALLENGE = 'GOVERNMENT_CHALLENGE',
  INDUSTRY_CHALLENGE = 'INDUSTRY_CHALLENGE',
  RESEARCH_OPPORTUNITY = 'RESEARCH_OPPORTUNITY',
  HACKATHON = 'HACKATHON',
  COMPETITION = 'COMPETITION',
  FUNDING_OPPORTUNITY = 'FUNDING_OPPORTUNITY',
  COLLABORATION_REQUEST = 'COLLABORATION_REQUEST',
  OPEN_SOURCE_PROJECT = 'OPEN_SOURCE_PROJECT'
}

export enum OpportunityStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  IN_REVIEW = 'IN_REVIEW',
  FUNDED = 'FUNDED',
  CLOSED = 'CLOSED',
  COMPLETED = 'COMPLETED'
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  REVIEWED = 'REVIEWED',
  SHORTLISTED = 'SHORTLISTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
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

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  deliverables: string[];
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  postedBy: string; // userId
  posterUsername: string;
  posterRole: UserRole;
  organizationName: string;
  organizationLogo?: string;
  domain: string; // AI, HealthTech, AgriTech, CleanEnergy, EdTech, FinTech
  budget?: number;
  currency: string; // PKR, USD
  budgetType: 'FIXED' | 'RANGE' | 'GRANT' | 'TBD';
  deadline: string;
  startDate?: string;
  duration?: string; // e.g. "6 Months"
  requiredSkills: string[];
  requiredRoles: string[];
  status: OpportunityStatus;
  visibility: 'PUBLIC' | 'PRIVATE' | 'INVITE_ONLY';
  attachments: string[];
  tags: string[];
  milestones: Milestone[];
  featured?: boolean;
  viewCount: number;
  applicationCount: number;
  collaboratorCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  applicantId: string;
  applicantUsername: string;
  applicantRole: UserRole;
  applicantName: string;
  coverLetter: string;
  proposedApproach: string;
  proposedBudget?: number;
  proposedTimeline?: string;
  attachments: string[];
  status: ApplicationStatus;
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  opportunityId: string;
  createdAt: string;
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
