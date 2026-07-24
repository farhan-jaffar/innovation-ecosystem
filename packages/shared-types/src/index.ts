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

export enum PublicationType {
  PAPER = 'PAPER',
  PATENT = 'PATENT',
  DATASET = 'DATASET',
  PROTOTYPE = 'PROTOTYPE',
  IDEA = 'IDEA'
}

export enum AccessType {
  OPEN = 'OPEN',
  RESTRICTED = 'RESTRICTED',
  COMMERCIAL = 'COMMERCIAL'
}

export enum ResearchStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  INTERNSHIP = 'INTERNSHIP',
  RESEARCH_POSITION = 'RESEARCH_POSITION',
  CONTRACT = 'CONTRACT'
}

export enum ExperienceLevel {
  ENTRY = 'ENTRY',
  MID = 'MID',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT'
}

export enum JobStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CLOSED = 'CLOSED'
}

export enum JobApplicationStatus {
  APPLIED = 'APPLIED',
  SCREENED = 'SCREENED',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  HIRED = 'HIRED',
  REJECTED = 'REJECTED'
}

export enum FundingType {
  GRANT = 'GRANT',
  SCHOLARSHIP = 'SCHOLARSHIP',
  INNOVATION_CHALLENGE = 'INNOVATION_CHALLENGE',
  SEED_FUNDING = 'SEED_FUNDING',
  RD_FUNDING = 'RD_FUNDING'
}

export enum FundingEligibility {
  INDIVIDUAL = 'INDIVIDUAL',
  UNIVERSITY = 'UNIVERSITY',
  STARTUP = 'STARTUP',
  COMPANY = 'COMPANY',
  ANY = 'ANY'
}

export enum FundingOpportunityStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  EVALUATION = 'EVALUATION',
  CLOSED = 'CLOSED',
  AWARDED = 'AWARDED'
}

export enum FundingProposalStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  APPROVED = 'APPROVED',
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
  postedBy: string;
  posterUsername: string;
  posterRole: UserRole;
  organizationName: string;
  organizationLogo?: string;
  domain: string;
  budget?: number;
  currency: string;
  budgetType: 'FIXED' | 'RANGE' | 'GRANT' | 'TBD';
  deadline: string;
  startDate?: string;
  duration?: string;
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

export interface Research {
  id: string;
  title: string;
  abstract: string;
  pdfUrl?: string;
  authors: string[];
  affiliations: string[];
  domain: string;
  subDomain?: string;
  keywords: string[];
  publicationType: PublicationType;
  publishedDate: string;
  journalName?: string;
  doi?: string;
  externalUrl?: string;
  license: string;
  accessType: AccessType;
  citations: number;
  downloads: number;
  views: number;
  collaborationOpen: boolean;
  fundingRequest: boolean;
  fundingAmount?: number;
  status: ResearchStatus;
  postedBy: string;
  posterUsername: string;
  posterRole: UserRole;
  organizationName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchCollabInquiry {
  id: string;
  researchId: string;
  researchTitle: string;
  inquirerId: string;
  inquirerUsername: string;
  inquirerRole: UserRole;
  inquirerOrgName: string;
  inquiryType: 'COMMERCIALIZATION' | 'JOINT_R_AND_D' | 'GOVT_INTEREST' | 'FUNDING';
  message: string;
  contactEmail: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
}

export interface JobPosting {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  description: string;
  type: JobType;
  domain: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  salaryType: 'MONTHLY' | 'YEARLY';
  location: string;
  remote: boolean;
  hybrid: boolean;
  applicationDeadline: string;
  startDate?: string;
  perks: string[];
  responsibilities: string[];
  requirements: string[];
  status: JobStatus;
  viewCount: number;
  applicantCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicantId: string;
  applicantUsername: string;
  applicantName: string;
  applicantEmail: string;
  coverLetter: string;
  resumeUrl?: string;
  status: JobApplicationStatus;
  notes?: string;
  interviewDate?: string;
  recommendations?: UniversityRecommendation[];
  createdAt: string;
  updatedAt: string;
}

export interface UniversityRecommendation {
  id: string;
  jobId: string;
  jobTitle: string;
  universityId: string;
  universityName: string;
  studentId: string;
  studentName: string;
  note: string;
  createdAt: string;
}

export interface FundingOpportunity {
  id: string;
  funderId: string;
  funderUsername: string;
  funderRole: UserRole;
  organizationName: string;
  organizationLogo?: string;
  title: string;
  description: string;
  type: FundingType;
  amount: number;
  currency: string;
  fundingType: 'FULL' | 'PARTIAL' | 'MILESTONE_BASED';
  eligibility: FundingEligibility;
  domain: string;
  requirements: string[];
  applicationDeadline: string;
  projectStartDate?: string;
  projectEndDate?: string;
  maxApplicants?: number;
  documentsRequired: string[];
  status: FundingOpportunityStatus;
  viewCount: number;
  proposalCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FundingProposal {
  id: string;
  fundingId: string;
  fundingTitle: string;
  applicantId: string;
  applicantUsername: string;
  applicantRole: UserRole;
  applicantName: string;
  proposalTitle: string;
  proposalDescription: string;
  budget: number;
  timeline: string;
  milestones: Milestone[];
  teamMembers: string[];
  attachments: string[];
  status: FundingProposalStatus;
  reviewerNotes?: string;
  approvedAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Disbursement {
  id: string;
  amount: number;
  date: string;
  status: 'PENDING' | 'RELEASED' | 'WITHHELD';
  note: string;
}

export interface FundedProject {
  id: string;
  proposalId: string;
  fundingTitle: string;
  recipientName: string;
  totalGrant: number;
  disbursedAmount: number;
  currentMilestoneIndex: number;
  milestones: Milestone[];
  disbursements: Disbursement[];
  progressReports: string[];
  status: 'ACTIVE' | 'COMPLETED' | 'HALTED';
  createdAt: string;
  updatedAt: string;
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
