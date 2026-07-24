import {
  User,
  UserRole,
  UserStatus,
  CompanyStage,
  IndividualAvailability,
  Opportunity,
  Application,
  Bookmark,
  ProjectType,
  OpportunityStatus,
  ApplicationStatus,
  Research,
  ResearchCollabInquiry,
  PublicationType,
  AccessType,
  ResearchStatus,
  JobPosting,
  JobApplication,
  UniversityRecommendation,
  JobType,
  ExperienceLevel,
  JobStatus,
  JobApplicationStatus,
  FundingOpportunity,
  FundingProposal,
  FundedProject,
  FundingType,
  FundingEligibility,
  FundingOpportunityStatus,
  FundingProposalStatus,
  Disbursement
} from '@innovation/shared-types';

export class DataStore {
  private static instance: DataStore;
  private users: Map<string, User> = new Map();
  private passwords: Map<string, string> = new Map();
  private opportunities: Map<string, Opportunity> = new Map();
  private applications: Map<string, Application> = new Map();
  private bookmarks: Map<string, Bookmark> = new Map();
  private researches: Map<string, Research> = new Map();
  private collabInquiries: Map<string, ResearchCollabInquiry> = new Map();
  private jobs: Map<string, JobPosting> = new Map();
  private jobApplications: Map<string, JobApplication> = new Map();
  private universityRecommendations: Map<string, UniversityRecommendation> = new Map();
  private fundingOpps: Map<string, FundingOpportunity> = new Map();
  private fundingProposals: Map<string, FundingProposal> = new Map();
  private fundedProjects: Map<string, FundedProject> = new Map();

  private constructor() {
    this.seedInitialData();
  }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  private seedInitialData() {
    // 1. Seed Government User
    const govUser: User = {
      id: 'gov-001',
      email: 'moitt@gov.pk',
      username: 'moitt',
      role: UserRole.GOVERNMENT,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        id: 'gov-prof-001',
        userId: 'gov-001',
        organizationName: 'Ministry of Information Technology & Telecommunication',
        ministry: 'Federal Ministry of IT & Telecom',
        jurisdiction: 'National (Pakistan)',
        website: 'https://moitt.gov.pk',
        logo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150',
        contactEmail: 'info@moitt.gov.pk',
        contactPhone: '+92 51 9201990',
        verificationStatus: 'VERIFIED',
        nationalFocusAreas: ['Artificial Intelligence', 'Cybersecurity', 'AgriTech', 'Clean Energy', 'Healthcare IT']
      }
    };

    // 2. Seed University User
    const uniUser: User = {
      id: 'uni-001',
      email: 'research@fast.edu.pk',
      username: 'fast-nuces',
      role: UserRole.UNIVERSITY,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        id: 'uni-prof-001',
        userId: 'uni-001',
        name: 'FAST National University of Computer & Emerging Sciences',
        country: 'Pakistan',
        city: 'Islamabad',
        ranking: 'Top #1 Computer Science University in Pakistan',
        accreditation: 'HEC & NCEAC W4 Accredited',
        departments: ['Computer Science', 'Artificial Intelligence', 'Data Science', 'Electrical Engineering', 'Cyber Security'],
        facultiesCount: 350,
        labsCount: 24,
        incubators: ['FAST Innovation & Incubation Center (FIIC)', 'National Center of Artificial Intelligence (NCAI)'],
        website: 'https://nu.edu.pk',
        logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150',
        verificationStatus: 'VERIFIED'
      }
    };

    // 3. Seed Company User
    const compUser: User = {
      id: 'comp-001',
      email: 'innovate@systems.ltd',
      username: 'systemsltd',
      role: UserRole.COMPANY,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        id: 'comp-prof-001',
        userId: 'comp-001',
        name: 'Systems Limited',
        industry: 'Enterprise Software, AI & Cloud Services',
        size: '5000+ Employees',
        stage: CompanyStage.ENTERPRISE,
        description: 'Global SI technology enterprise pioneering digital transformation and AI innovations across Pakistan.',
        website: 'https://systemsltd.com',
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150',
        verificationStatus: 'VERIFIED',
        techStack: ['Python', 'PyTorch', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure']
      }
    };

    // 4. Seed Individual User (Dr. Ali Raza)
    const indUser: User = {
      id: 'ind-001',
      email: 'ali.raza@researcher.pk',
      username: 'draliraza',
      role: UserRole.INDIVIDUAL,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        id: 'ind-prof-001',
        userId: 'ind-001',
        firstName: 'Dr. Ali',
        lastName: 'Raza',
        headline: 'Lead AI Researcher & Associate Professor of Computer Vision',
        bio: 'Ph.D. in Computer Vision & Robotics. Passionate about applying AI algorithms to solve Pakistan agriculture and energy challenges.',
        education: [
          { institution: 'NUST Islamabad', degree: 'Ph.D.', fieldOfStudy: 'Computer Vision & Deep Learning', startYear: 2017, endYear: 2021 },
          { institution: 'FAST NUCES Lahore', degree: 'M.S.', fieldOfStudy: 'Computer Science', startYear: 2014, endYear: 2016 }
        ],
        experience: [
          { company: 'National Center of AI (NCAI)', title: 'Principal Investigator - Precision Agriculture', startDate: '2021-09-01', current: true, description: 'Directing AI drone sensor diagnostic labs.' }
        ],
        skills: ['Computer Vision', 'PyTorch', 'TensorFlow', 'AgriTech AI', 'Drone Autopilot', 'OpenCV', 'Python', 'YOLOv8'],
        researchInterests: ['Early Crop Disease Detection using Hyperspectral Imaging', 'Autonomous Drone Navigation in GPS-denied Fields'],
        githubUrl: 'https://github.com/draliraza-ai',
        portfolioUrl: 'https://aliraza.ai',
        linkedinUrl: 'https://linkedin.com/in/draliraza-ai',
        availability: IndividualAvailability.OPEN_TO_WORK
      }
    };

    this.users.set(govUser.id, govUser);
    this.users.set(uniUser.id, uniUser);
    this.users.set(compUser.id, compUser);
    this.users.set(indUser.id, indUser);

    this.passwords.set(govUser.email, 'password123');
    this.passwords.set(uniUser.email, 'password123');
    this.passwords.set(compUser.email, 'password123');
    this.passwords.set(indUser.email, 'password123');

    // -------------------------------------------------------------
    // SEED FUNDING OPPORTUNITIES (Phase 5 Data)
    // -------------------------------------------------------------
    const fund1: FundingOpportunity = {
      id: 'fund-001',
      funderId: 'gov-001',
      funderUsername: 'moitt',
      funderRole: UserRole.GOVERNMENT,
      organizationName: 'Ministry of IT & Telecommunication (MoITT)',
      organizationLogo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150',
      title: 'National AI & AgriTech Grand Challenge Fund 2026',
      description: 'MoITT is disbursing 15 Million PKR in milestone-based grant funding to university labs and AI startups developing deployment-ready computer vision solutions for agricultural pest diagnostic & crop yield optimization.',
      type: FundingType.GRANT,
      amount: 15000000,
      currency: 'PKR',
      fundingType: 'MILESTONE_BASED',
      eligibility: FundingEligibility.ANY,
      domain: 'AgriTech',
      requirements: [
        'Must deploy PyTorch or TensorFlow edge AI models.',
        'Must provide 10,000+ local dataset images annotated for Punjab crops.',
        'Must demonstrate field test within 6 months.'
      ],
      applicationDeadline: '2026-10-30',
      projectStartDate: '2026-11-15',
      projectEndDate: '2027-11-15',
      maxApplicants: 20,
      documentsRequired: ['Technical Architecture Proposal', 'Budget Line Item Breakdown', 'University/Startup Registration Certificate'],
      status: FundingOpportunityStatus.OPEN,
      viewCount: 650,
      proposalCount: 14,
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const fund2: FundingOpportunity = {
      id: 'fund-002',
      funderId: 'gov-001',
      funderUsername: 'moitt',
      funderRole: UserRole.GOVERNMENT,
      organizationName: 'Higher Education Commission (HEC Pakistan)',
      organizationLogo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150',
      title: 'HEC National Technology Transfer R&D Fund',
      description: '8 Million PKR grant fund dedicated to university research faculties for patent commercialization and technology transfer to Pakistan industry partners.',
      type: FundingType.RD_FUNDING,
      amount: 8000000,
      currency: 'PKR',
      fundingType: 'MILESTONE_BASED',
      eligibility: FundingEligibility.UNIVERSITY,
      domain: 'CleanEnergy',
      requirements: ['Must possess registered or filed patent', 'Must have corporate industrial partner endorsement'],
      applicationDeadline: '2026-09-30',
      documentsRequired: ['Patent Certificate', 'MOU with Corporate Partner'],
      status: FundingOpportunityStatus.OPEN,
      viewCount: 410,
      proposalCount: 6,
      createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.fundingOpps.set(fund1.id, fund1);
    this.fundingOpps.set(fund2.id, fund2);

    // Seed Sample Funding Proposal (FAST University -> MoITT 5M Grant Proposal)
    const prop1: FundingProposal = {
      id: 'fprop-001',
      fundingId: 'fund-001',
      fundingTitle: fund1.title,
      applicantId: 'uni-001',
      applicantUsername: 'fast-nuces',
      applicantRole: UserRole.UNIVERSITY,
      applicantName: 'FAST National University / NCAI Lab',
      proposalTitle: 'Hyperspectral Drone Diagnostics & Edge AI System for Wheat Rust',
      proposalDescription: 'Proposal to deploy 12 multi-spectral agricultural drones paired with edge-AI Raspberry Pi inference payloads across Multan and Faisalabad fields.',
      budget: 5000000,
      timeline: '12 Months (4 Quarters)',
      milestones: [
        { id: 'fm1', title: 'Phase 1: Multi-Spectral Drone Field Data Collection', description: 'Acquire 10k aerial hyperspectral field images across 50 farms.', dueDate: '2026-12-30', deliverables: ['Annotated PCDH-2026 Dataset', 'Quarterly Progress Report'], status: 'COMPLETED' },
        { id: 'fm2', title: 'Phase 2: Edge Jetson Nano Model Optimization', description: 'Compress YOLOv8 Transformer model for 45 FPS edge execution.', dueDate: '2027-03-30', deliverables: ['Edge Model Weights', 'Inference Benchmark'], status: 'COMPLETED' },
        { id: 'fm3', title: 'Phase 3: Live Pilot Demonstration with Farmers', description: 'Deploy drone swarm in Multan and measure crop yield improvement.', dueDate: '2027-06-30', deliverables: ['Farmer Impact Study', 'Final System API'], status: 'IN_PROGRESS' }
      ],
      teamMembers: ['Dr. Ali Raza (Principal Investigator)', 'Prof. Tariq Mahmood', '3 FAST M.S. Research Assistants'],
      attachments: ['https://nu.edu.pk/proposals/agritech-5m-moitt.pdf'],
      status: FundingProposalStatus.APPROVED,
      reviewerNotes: 'Outstanding proposal with proven academic track record and clear milestone deliverables.',
      approvedAmount: 5000000,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.fundingProposals.set(prop1.id, prop1);

    // Seed 1 Active Funded Project with Disbursements
    const funded1: FundedProject = {
      id: 'fproj-001',
      proposalId: prop1.id,
      fundingTitle: fund1.title,
      recipientName: 'FAST National University / NCAI Lab',
      totalGrant: 5000000,
      disbursedAmount: 2500000,
      currentMilestoneIndex: 2,
      milestones: prop1.milestones,
      disbursements: [
        { id: 'dis-001', amount: 1500000, date: '2026-11-20', status: 'RELEASED', note: 'Initial Mobilization & Sensor Purchase Grant' },
        { id: 'dis-002', amount: 1000000, date: '2027-01-15', status: 'RELEASED', note: 'Phase 1 Dataset Completion Milestone Grant' },
        { id: 'dis-003', amount: 2500000, date: '2027-07-01', status: 'PENDING', note: 'Phase 3 Live Field Pilot Milestone Release' }
      ],
      progressReports: ['https://nu.edu.pk/reports/q1-agritech-2026.pdf', 'https://nu.edu.pk/reports/q2-agritech-2027.pdf'],
      status: 'ACTIVE',
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.fundedProjects.set(funded1.id, funded1);
  }

  // --- USER OPERATIONS ---
  public findUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserByUsername(username: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.username.toLowerCase() === username.toLowerCase());
  }

  public findUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  public createUser(user: User, password: string): User {
    this.users.set(user.id, user);
    this.passwords.set(user.email, password);
    return user;
  }

  public updateUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  public verifyPassword(email: string, pass: string): boolean {
    return this.passwords.get(email) === pass;
  }

  public updatePassword(email: string, newPass: string): boolean {
    this.passwords.set(email, newPass);
    return true;
  }

  public deleteUser(id: string): boolean {
    const user = this.users.get(id);
    if (!user) return false;
    this.passwords.delete(user.email);
    this.users.delete(id);
    return true;
  }

  public updateAvatar(userId: string, avatarUrl: string): User | undefined {
    const user = this.users.get(userId);
    if (!user) return undefined;
    if (user.profile) {
      user.profile.logo = avatarUrl;
    }
    user.updatedAt = new Date().toISOString();
    this.users.set(userId, user);
    return user;
  }

  public verifyUserEmail(email: string): boolean {
    const user = this.findUserByEmail(email);
    if (!user) return false;
    user.emailVerified = true;
    user.updatedAt = new Date().toISOString();
    this.users.set(user.id, user);
    return true;
  }

  public getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  public getAllTalent(filters?: { search?: string; domain?: string; skill?: string }): User[] {
    let list = Array.from(this.users.values()).filter(u => u.role === UserRole.INDIVIDUAL);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(u => {
        const prof = u.profile as any;
        return (
          u.username.toLowerCase().includes(q) ||
          prof?.firstName?.toLowerCase().includes(q) ||
          prof?.headline?.toLowerCase().includes(q) ||
          prof?.skills?.some((s: string) => s.toLowerCase().includes(q))
        );
      });
    }
    return list;
  }

  public getAllOpportunities(filters?: { type?: string; domain?: string; search?: string; status?: string; featured?: boolean }): Opportunity[] {
    let list = Array.from(this.opportunities.values());
    if (filters?.type) list = list.filter(o => o.type === filters.type);
    if (filters?.domain) list = list.filter(o => o.domain.toLowerCase() === filters.domain?.toLowerCase());
    if (filters?.status) list = list.filter(o => o.status === filters.status);
    if (filters?.featured) list = list.filter(o => o.featured);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(o => o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q));
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOpportunityById(id: string): Opportunity | undefined {
    const opp = this.opportunities.get(id);
    if (opp) {
      opp.viewCount += 1;
      this.opportunities.set(id, opp);
    }
    return opp;
  }

  public createOpportunity(opp: Opportunity): Opportunity {
    this.opportunities.set(opp.id, opp);
    return opp;
  }

  public updateOpportunity(id: string, updates: Partial<Opportunity>): Opportunity | undefined {
    const existing = this.opportunities.get(id);
    if (!existing) return undefined;
    const updated: Opportunity = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    this.opportunities.set(id, updated);
    return updated;
  }

  public deleteOpportunity(id: string): boolean {
    return this.opportunities.delete(id);
  }

  public createApplication(app: Application): Application {
    this.applications.set(app.id, app);
    const opp = this.opportunities.get(app.opportunityId);
    if (opp) {
      opp.applicationCount += 1;
      this.opportunities.set(opp.id, opp);
    }
    return app;
  }

  public getApplicationsForOpportunity(oppId: string): Application[] {
    return Array.from(this.applications.values()).filter(a => a.opportunityId === oppId);
  }

  public getApplicationsForUser(userId: string): Application[] {
    return Array.from(this.applications.values()).filter(a => a.applicantId === userId);
  }

  public updateApplicationStatus(appId: string, status: ApplicationStatus, reviewNotes?: string, reviewedBy?: string): Application | undefined {
    const app = this.applications.get(appId);
    if (!app) return undefined;
    app.status = status;
    if (reviewNotes) app.reviewNotes = reviewNotes;
    if (reviewedBy) app.reviewedBy = reviewedBy;
    app.reviewedAt = new Date().toISOString();
    app.updatedAt = new Date().toISOString();
    this.applications.set(appId, app);
    return app;
  }

  public toggleBookmark(userId: string, opportunityId: string): { bookmarked: boolean } {
    const key = `${userId}:${opportunityId}`;
    if (this.bookmarks.has(key)) {
      this.bookmarks.delete(key);
      return { bookmarked: false };
    } else {
      const b: Bookmark = { id: `bm-${Date.now()}`, userId, opportunityId, createdAt: new Date().toISOString() };
      this.bookmarks.set(key, b);
      return { bookmarked: true };
    }
  }

  public getUserBookmarks(userId: string): Opportunity[] {
    const oppIds = Array.from(this.bookmarks.values()).filter(b => b.userId === userId).map(b => b.opportunityId);
    return oppIds.map(id => this.opportunities.get(id)).filter((opp): opp is Opportunity => opp !== undefined);
  }

  public getAllResearch(filters?: { domain?: string; publicationType?: string; search?: string; fundingRequest?: boolean; collaborationOpen?: boolean; authorUsername?: string }): Research[] {
    let list = Array.from(this.researches.values());
    if (filters?.publicationType) list = list.filter(r => r.publicationType === filters.publicationType);
    if (filters?.domain) list = list.filter(r => r.domain.toLowerCase() === filters.domain?.toLowerCase());
    if (filters?.fundingRequest) list = list.filter(r => r.fundingRequest);
    if (filters?.collaborationOpen) list = list.filter(r => r.collaborationOpen);
    if (filters?.authorUsername) list = list.filter(r => r.posterUsername.toLowerCase() === filters.authorUsername?.toLowerCase());
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(r => r.title.toLowerCase().includes(q) || r.abstract.toLowerCase().includes(q));
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getResearchById(id: string): Research | undefined {
    const r = this.researches.get(id);
    if (r) {
      r.views += 1;
      this.researches.set(id, r);
    }
    return r;
  }

  public createResearch(research: Research): Research {
    this.researches.set(research.id, research);
    return research;
  }

  public incrementDownload(id: string): Research | undefined {
    const r = this.researches.get(id);
    if (r) {
      r.downloads += 1;
      this.researches.set(id, r);
    }
    return r;
  }

  public createCollabInquiry(inquiry: ResearchCollabInquiry): ResearchCollabInquiry {
    this.collabInquiries.set(inquiry.id, inquiry);
    return inquiry;
  }

  public getCollabInquiriesForResearch(researchId: string): ResearchCollabInquiry[] {
    return Array.from(this.collabInquiries.values()).filter(c => c.researchId === researchId);
  }

  public getAllJobs(filters?: { type?: string; domain?: string; experienceLevel?: string; remote?: boolean; search?: string }): JobPosting[] {
    let list = Array.from(this.jobs.values());
    if (filters?.type) list = list.filter(j => j.type === filters.type);
    if (filters?.domain) list = list.filter(j => j.domain.toLowerCase() === filters.domain?.toLowerCase());
    if (filters?.experienceLevel) list = list.filter(j => j.experienceLevel === filters.experienceLevel);
    if (filters?.remote) list = list.filter(j => j.remote);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(j => j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q));
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getJobById(id: string): JobPosting | undefined {
    const j = this.jobs.get(id);
    if (j) {
      j.viewCount += 1;
      this.jobs.set(id, j);
    }
    return j;
  }

  public createJob(job: JobPosting): JobPosting {
    this.jobs.set(job.id, job);
    return job;
  }

  public createJobApplication(app: JobApplication): JobApplication {
    this.jobApplications.set(app.id, app);
    const job = this.jobs.get(app.jobId);
    if (job) {
      job.applicantCount += 1;
      this.jobs.set(job.id, job);
    }
    return app;
  }

  public getApplicationsForJob(jobId: string): JobApplication[] {
    return Array.from(this.jobApplications.values()).filter(a => a.jobId === jobId);
  }

  public getApplicationsForApplicant(applicantId: string): JobApplication[] {
    return Array.from(this.jobApplications.values()).filter(a => a.applicantId === applicantId);
  }

  public updateJobApplicationStatus(appId: string, status: JobApplicationStatus, notes?: string, interviewDate?: string): JobApplication | undefined {
    const app = this.jobApplications.get(appId);
    if (!app) return undefined;
    app.status = status;
    if (notes) app.notes = notes;
    if (interviewDate) app.interviewDate = interviewDate;
    app.updatedAt = new Date().toISOString();
    this.jobApplications.set(appId, app);
    return app;
  }

  public addUniversityRecommendation(rec: UniversityRecommendation): UniversityRecommendation {
    this.universityRecommendations.set(rec.id, rec);
    return rec;
  }

  // --- FUNDING MARKETPLACE OPERATIONS (Phase 5) ---
  public getAllFunding(filters?: { type?: string; eligibility?: string; domain?: string; search?: string }): FundingOpportunity[] {
    let list = Array.from(this.fundingOpps.values());

    if (filters?.type) list = list.filter(f => f.type === filters.type);
    if (filters?.eligibility) list = list.filter(f => f.eligibility === filters.eligibility || f.eligibility === FundingEligibility.ANY);
    if (filters?.domain) list = list.filter(f => f.domain.toLowerCase() === filters.domain?.toLowerCase());
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(f => f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.organizationName.toLowerCase().includes(q));
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getFundingById(id: string): FundingOpportunity | undefined {
    const f = this.fundingOpps.get(id);
    if (f) {
      f.viewCount += 1;
      this.fundingOpps.set(id, f);
    }
    return f;
  }

  public createFunding(funding: FundingOpportunity): FundingOpportunity {
    this.fundingOpps.set(funding.id, funding);
    return funding;
  }

  public createFundingProposal(prop: FundingProposal): FundingProposal {
    this.fundingProposals.set(prop.id, prop);
    const fund = this.fundingOpps.get(prop.fundingId);
    if (fund) {
      fund.proposalCount += 1;
      this.fundingOpps.set(fund.id, fund);
    }
    return prop;
  }

  public getProposalsForFunding(fundingId: string): FundingProposal[] {
    return Array.from(this.fundingProposals.values())
      .filter(p => p.fundingId === fundingId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getProposalsForApplicant(applicantId: string): FundingProposal[] {
    return Array.from(this.fundingProposals.values())
      .filter(p => p.applicantId === applicantId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public updateFundingProposalStatus(proposalId: string, status: FundingProposalStatus, reviewerNotes?: string, approvedAmount?: number): FundingProposal | undefined {
    const prop = this.fundingProposals.get(proposalId);
    if (!prop) return undefined;

    prop.status = status;
    if (reviewerNotes) prop.reviewerNotes = reviewerNotes;
    if (approvedAmount) prop.approvedAmount = approvedAmount;
    prop.updatedAt = new Date().toISOString();

    this.fundingProposals.set(proposalId, prop);

    // If APPROVED, auto-create FundedProject entry
    if (status === FundingProposalStatus.APPROVED) {
      const existingProject = Array.from(this.fundedProjects.values()).find(fp => fp.proposalId === proposalId);
      if (!existingProject) {
        const newProject: FundedProject = {
          id: `fproj-${Date.now()}`,
          proposalId: prop.id,
          fundingTitle: prop.fundingTitle,
          recipientName: prop.applicantName,
          totalGrant: approvedAmount || prop.budget,
          disbursedAmount: 0,
          currentMilestoneIndex: 0,
          milestones: prop.milestones,
          disbursements: [
            {
              id: `dis-${Date.now()}`,
              amount: (approvedAmount || prop.budget) * 0.3,
              date: new Date().toISOString().split('T')[0],
              status: 'RELEASED',
              note: 'Initial Mobilization Grant Release (30%)'
            }
          ],
          progressReports: [],
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        newProject.disbursedAmount = newProject.disbursements[0].amount;
        this.fundedProjects.set(newProject.id, newProject);
      }
    }

    return prop;
  }

  public getAllFundedProjects(): FundedProject[] {
    return Array.from(this.fundedProjects.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getFundedProjectById(id: string): FundedProject | undefined {
    return this.fundedProjects.get(id);
  }

  public updateFundedProjectMilestone(projectId: string, milestoneIndex: number, newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED', releaseDisbursementAmount?: number): FundedProject | undefined {
    const proj = this.fundedProjects.get(projectId);
    if (!proj) return undefined;

    if (proj.milestones[milestoneIndex]) {
      proj.milestones[milestoneIndex].status = newStatus;
      if (newStatus === 'COMPLETED') {
        proj.currentMilestoneIndex = Math.min(milestoneIndex + 1, proj.milestones.length - 1);
      }
    }

    if (releaseDisbursementAmount && releaseDisbursementAmount > 0) {
      const newDisbursement: Disbursement = {
        id: `dis-${Date.now()}`,
        amount: releaseDisbursementAmount,
        date: new Date().toISOString().split('T')[0],
        status: 'RELEASED',
        note: `Milestone ${milestoneIndex + 1} Completion Release`
      };
      proj.disbursements.push(newDisbursement);
      proj.disbursedAmount += releaseDisbursementAmount;
    }

    proj.updatedAt = new Date().toISOString();
    this.fundedProjects.set(projectId, proj);
    return proj;
  }
}
