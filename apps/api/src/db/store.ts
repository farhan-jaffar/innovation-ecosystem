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
  JobApplicationStatus
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
    // SEED JOBS & TALENT POSITIONS (Phase 4 Data)
    // -------------------------------------------------------------
    const job1: JobPosting = {
      id: 'job-001',
      companyId: 'comp-001',
      companyName: 'Systems Limited',
      companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150',
      title: 'Senior Computer Vision & AI Architect',
      description: 'Systems Limited Enterprise AI Division is hiring a Senior AI Architect to design and deploy real-time computer vision pipelines for industrial automation and agricultural aerial diagnostics.',
      type: JobType.FULL_TIME,
      domain: 'Robotics & AI',
      requiredSkills: ['Computer Vision', 'PyTorch', 'YOLOv8', 'Python', 'Docker', 'CUDA'],
      preferredSkills: ['ROS2', 'TensorRT', 'Kubernetes'],
      experienceLevel: ExperienceLevel.SENIOR,
      salaryMin: 300000,
      salaryMax: 500000,
      currency: 'PKR',
      salaryType: 'MONTHLY',
      location: 'Lahore / Hybrid',
      remote: true,
      hybrid: true,
      applicationDeadline: '2026-09-15',
      perks: ['Health Insurance', 'Annual Performance Bonus', 'Remote Work Flexibility', 'Conference Grants'],
      responsibilities: [
        'Architect end-to-end PyTorch deep learning models for edge deployment.',
        'Collaborate with university research labs on technology transfer.'
      ],
      requirements: [
        'M.S. or Ph.D. in Computer Science, AI, or Electrical Engineering.',
        '5+ years hands-on experience deploying PyTorch models in production.'
      ],
      status: JobStatus.ACTIVE,
      viewCount: 420,
      applicantCount: 18,
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const job2: JobPosting = {
      id: 'job-002',
      companyId: 'uni-001',
      companyName: 'FAST National University (NCAI Lab)',
      companyLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150',
      title: 'Precision Agriculture Postdoctoral AI Fellow',
      description: 'National Center of Artificial Intelligence (NCAI) at FAST NUCES is seeking a Postdoc Fellow to lead hyperspectral crop rust diagnostic algorithms under Ministry grant.',
      type: JobType.RESEARCH_POSITION,
      domain: 'AgriTech',
      requiredSkills: ['Hyperspectral Imaging', 'PyTorch', 'Remote Sensing', 'Python'],
      preferredSkills: ['Drone Flight Operations', 'QGIS'],
      experienceLevel: ExperienceLevel.EXPERT,
      salaryMin: 180000,
      salaryMax: 250000,
      currency: 'PKR',
      salaryType: 'MONTHLY',
      location: 'Islamabad',
      remote: false,
      hybrid: true,
      applicationDeadline: '2026-08-30',
      perks: ['HEC Postdoc Stipend', 'Lab Equipment Access', 'IEEE Publication Subsidies'],
      responsibilities: ['Publish top-tier journal papers', 'Mentor M.S. research students'],
      requirements: ['Ph.D. in Computer Vision or Remote Sensing'],
      status: JobStatus.ACTIVE,
      viewCount: 290,
      applicantCount: 8,
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const job3: JobPosting = {
      id: 'job-003',
      companyId: 'comp-001',
      companyName: 'Systems Limited',
      companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150',
      title: 'Embedded Edge AI & Drone Autopilot Intern',
      description: '3-month paid summer internship for final year university students building ROS2 drone autopilot firmware and Jetson Nano inference models.',
      type: JobType.INTERNSHIP,
      domain: 'Robotics & AI',
      requiredSkills: ['C++', 'Python', 'ROS2', 'Linux'],
      preferredSkills: ['PX4 Autopilot', 'Raspberry Pi'],
      experienceLevel: ExperienceLevel.ENTRY,
      salaryMin: 60000,
      salaryMax: 90000,
      currency: 'PKR',
      salaryType: 'MONTHLY',
      location: 'Islamabad / Lahore',
      remote: false,
      hybrid: true,
      applicationDeadline: '2026-08-15',
      perks: ['Mentorship by Senior Architects', 'Full-time Hire Opportunity'],
      responsibilities: ['Write unit tests for ROS2 packages', 'Benchmark Jetson inference FPS'],
      requirements: ['Final year CS/EE undergraduate student with GPA > 3.2'],
      status: JobStatus.ACTIVE,
      viewCount: 680,
      applicantCount: 45,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.jobs.set(job1.id, job1);
    this.jobs.set(job2.id, job2);
    this.jobs.set(job3.id, job3);

    // Seed Sample Job Application (Dr. Ali Raza -> Systems Ltd AI Architect)
    const sampleJobApp: JobApplication = {
      id: 'japp-001',
      jobId: 'job-001',
      jobTitle: job1.title,
      companyName: job1.companyName,
      applicantId: 'ind-001',
      applicantUsername: 'draliraza',
      applicantName: 'Dr. Ali Raza',
      applicantEmail: 'ali.raza@researcher.pk',
      coverLetter: 'Having completed my Ph.D. at NUST and led drone computer vision projects at NCAI, I am eager to architect commercial scale AI solutions at Systems Limited.',
      resumeUrl: 'https://aliraza.ai/cv-2026.pdf',
      status: JobApplicationStatus.INTERVIEW,
      notes: 'Strong candidate with doctorate and 42 citations.',
      interviewDate: '2026-08-05T10:00:00Z',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.jobApplications.set(sampleJobApp.id, sampleJobApp);
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

  // --- TALENT DISCOVERY OPERATIONS ---
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

    if (filters?.skill) {
      const sk = filters.skill.toLowerCase();
      list = list.filter(u => {
        const prof = u.profile as any;
        return prof?.skills?.some((s: string) => s.toLowerCase().includes(sk));
      });
    }

    return list;
  }

  // --- OPPORTUNITY OPERATIONS ---
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

  // --- JOB MARKETPLACE OPERATIONS (Phase 4) ---
  public getAllJobs(filters?: { type?: string; domain?: string; experienceLevel?: string; remote?: boolean; search?: string }): JobPosting[] {
    let list = Array.from(this.jobs.values());

    if (filters?.type) list = list.filter(j => j.type === filters.type);
    if (filters?.domain) list = list.filter(j => j.domain.toLowerCase() === filters.domain?.toLowerCase());
    if (filters?.experienceLevel) list = list.filter(j => j.experienceLevel === filters.experienceLevel);
    if (filters?.remote) list = list.filter(j => j.remote);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(j => j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q) || j.companyName.toLowerCase().includes(q));
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
    return Array.from(this.jobApplications.values())
      .filter(a => a.jobId === jobId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getApplicationsForApplicant(applicantId: string): JobApplication[] {
    return Array.from(this.jobApplications.values())
      .filter(a => a.applicantId === applicantId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
}
