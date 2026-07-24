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
  ResearchStatus
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
    // SEED OPPORTUNITIES (Phase 2 Data)
    // -------------------------------------------------------------
    const opp1: Opportunity = {
      id: 'opp-001',
      title: 'National AI Challenge: Hyperspectral Crop Disease Detection',
      description: 'The Ministry of IT & Telecom invites AI startups, university labs, and researchers to develop computer vision algorithms for real-time crop rust & infestation detection across Punjab and Sindh farmland.',
      type: ProjectType.GOVERNMENT_CHALLENGE,
      postedBy: 'gov-001',
      posterUsername: 'moitt',
      posterRole: UserRole.GOVERNMENT,
      organizationName: 'Ministry of IT & Telecommunication',
      organizationLogo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150',
      domain: 'AgriTech',
      budget: 5000000,
      currency: 'PKR',
      budgetType: 'GRANT',
      deadline: '2026-09-30',
      startDate: '2026-10-15',
      duration: '12 Months',
      requiredSkills: ['Computer Vision', 'PyTorch', 'Hyperspectral Datasets', 'YOLOv8', 'AgriTech'],
      requiredRoles: ['Lead AI Researcher', 'Data Scientist', 'Embedded Edge AI Engineer'],
      status: OpportunityStatus.OPEN,
      visibility: 'PUBLIC',
      attachments: ['https://moitt.gov.pk/rfp-ai-agritech-2026.pdf'],
      tags: ['NationalAI', 'PrecisionAgriculture', 'Grant5M', 'MoITT'],
      milestones: [
        { id: 'm1', title: 'Data Collection & Annotation Phase', description: 'Acquire 10k aerial hyperspectral field images.', dueDate: '2026-12-01', deliverables: ['Annotated Dataset', 'Baseline Model'], status: 'IN_PROGRESS' },
        { id: 'm2', title: 'Field Edge Deployment Test', description: 'Deploy model on Raspberry Pi / Jetson Nano on drone payload.', dueDate: '2027-03-01', deliverables: ['Edge Inference API', 'Accuracy Benchmark Report'], status: 'PENDING' }
      ],
      featured: true,
      viewCount: 342,
      applicationCount: 12,
      collaboratorCount: 4,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.opportunities.set(opp1.id, opp1);

    // -------------------------------------------------------------
    // SEED RESEARCH HUB ITEMS (Phase 3 Core Data)
    // -------------------------------------------------------------
    const res1: Research = {
      id: 'res-001',
      title: 'Deep Learning Framework for Hyperspectral Rust Detection in Wheat Crops of Punjab',
      abstract: 'Early detection of stripe rust (Puccinia striiformis) in wheat crops is vital for Pakistan food security. This paper introduces an edge-optimized YOLOv8-Transformer architecture operating on 16-band hyperspectral imagery collected by agricultural drones across Multan and Faisalabad fields.',
      pdfUrl: 'https://aliraza.ai/papers/hyperspectral-rust-detection-2026.pdf',
      authors: ['Dr. Ali Raza', 'Prof. Tariq Mahmood', 'Ayesha Malik'],
      affiliations: ['FAST National University', 'National Center of Artificial Intelligence (NCAI)'],
      domain: 'AgriTech',
      subDomain: 'Computer Vision & Deep Learning',
      keywords: ['Hyperspectral Imaging', 'Precision Agriculture', 'YOLOv8', 'Wheat Rust', 'Edge AI'],
      publicationType: PublicationType.PAPER,
      publishedDate: '2026-03-15',
      journalName: 'IEEE Transactions on AgriTech & Intelligent Sensing',
      doi: '10.1109/TAGRI.2026.984120',
      externalUrl: 'https://doi.org/10.1109/TAGRI.2026.984120',
      license: 'CC BY 4.0 (Open Access)',
      accessType: AccessType.OPEN,
      citations: 42,
      downloads: 318,
      views: 890,
      collaborationOpen: true,
      fundingRequest: true,
      fundingAmount: 2500000,
      status: ResearchStatus.PUBLISHED,
      postedBy: 'ind-001',
      posterUsername: 'draliraza',
      posterRole: UserRole.INDIVIDUAL,
      organizationName: 'FAST National University / NCAI',
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const res2: Research = {
      id: 'res-002',
      title: 'Patent PK-2025-9812: Micro-Grid Real-Time Solar Load Balancing Controller',
      abstract: 'Patent filing for a micro-controller hardware unit implementing Deep Q-Networks to dynamically switch rural solar microgrid batteries and balance peak loads across remote villages in Khyber Pakhtunkhwa.',
      pdfUrl: 'https://nu.edu.pk/patents/pk-2025-9812.pdf',
      authors: ['Dr. Hassan Ali', 'FAST NUCES Research Lab'],
      affiliations: ['FAST National University Islamabad'],
      domain: 'CleanEnergy',
      subDomain: 'Smart Grids & Power Systems',
      keywords: ['Patent', 'Solar Energy', 'Deep Q-Learning', 'Microgrid', 'Load Balancing'],
      publicationType: PublicationType.PATENT,
      publishedDate: '2025-11-20',
      journalName: 'IPO Pakistan Patent Registry',
      doi: '10.5281/zenodo. patent.pk.9812',
      externalUrl: 'https://ipo.gov.pk/patents/9812',
      license: 'Commercial License Available',
      accessType: AccessType.COMMERCIAL,
      citations: 14,
      downloads: 95,
      views: 412,
      collaborationOpen: font_open_true(),
      fundingRequest: false,
      status: ResearchStatus.PUBLISHED,
      postedBy: 'uni-001',
      posterUsername: 'fast-nuces',
      posterRole: UserRole.UNIVERSITY,
      organizationName: 'FAST National University',
      createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const res3: Research = {
      id: 'res-003',
      title: 'Pakistan Crop Disease Hyperspectral Aerial Dataset (PCDH-2026)',
      abstract: 'Open-access benchmark dataset comprising 10,000 multi-spectral aerial images of wheat, cotton, and rice crops across Punjab, annotated with bounding boxes for 8 common crop pathogens.',
      pdfUrl: 'https://nu.edu.pk/datasets/pcdh-2026-preview.pdf',
      authors: ['Dr. Ali Raza', 'NCAI Precision Agriculture Group'],
      affiliations: ['NCAI Pakistan'],
      domain: 'AgriTech',
      subDomain: 'Datasets & Benchmarks',
      keywords: ['Dataset', 'Computer Vision', 'Hyperspectral', 'Drone Survey'],
      publicationType: PublicationType.DATASET,
      publishedDate: '2026-02-10',
      doi: '10.5281/zenodo.pcdh2026',
      externalUrl: 'https://zenodo.org/record/pcdh2026',
      license: 'CC BY-SA 4.0',
      accessType: AccessType.OPEN,
      citations: 29,
      downloads: 640,
      views: 1250,
      collaborationOpen: true,
      fundingRequest: false,
      status: ResearchStatus.PUBLISHED,
      postedBy: 'ind-001',
      posterUsername: 'draliraza',
      posterRole: UserRole.INDIVIDUAL,
      organizationName: 'NCAI Pakistan',
      createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      updatedAt: new Date().toISOString()
    };

    function font_open_true() { return true; }

    this.researches.set(res1.id, res1);
    this.researches.set(res2.id, res2);
    this.researches.set(res3.id, res3);
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

  // --- OPPORTUNITY OPERATIONS (Phase 2 Marketplace) ---
  public getAllOpportunities(filters?: {
    type?: string;
    domain?: string;
    search?: string;
    status?: string;
    featured?: boolean;
  }): Opportunity[] {
    let list = Array.from(this.opportunities.values());

    if (filters?.type) list = list.filter(o => o.type === filters.type);
    if (filters?.domain) list = list.filter(o => o.domain.toLowerCase() === filters.domain?.toLowerCase());
    if (filters?.status) list = list.filter(o => o.status === filters.status);
    if (filters?.featured) list = list.filter(o => o.featured);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(o =>
        o.title.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.organizationName.toLowerCase().includes(q) ||
        o.requiredSkills.some(s => s.toLowerCase().includes(q))
      );
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

  // --- APPLICATION OPERATIONS ---
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
    return Array.from(this.applications.values())
      .filter(a => a.opportunityId === oppId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getApplicationsForUser(userId: string): Application[] {
    return Array.from(this.applications.values())
      .filter(a => a.applicantId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
    const oppIds = Array.from(this.bookmarks.values())
      .filter(b => b.userId === userId)
      .map(b => b.opportunityId);
    return oppIds.map(id => this.opportunities.get(id)).filter((opp): opp is Opportunity => opp !== undefined);
  }

  // --- RESEARCH HUB OPERATIONS (Phase 3) ---
  public getAllResearch(filters?: {
    domain?: string;
    publicationType?: string;
    search?: string;
    fundingRequest?: boolean;
    collaborationOpen?: boolean;
    authorUsername?: string;
  }): Research[] {
    let list = Array.from(this.researches.values());

    if (filters?.publicationType) {
      list = list.filter(r => r.publicationType === filters.publicationType);
    }
    if (filters?.domain) {
      list = list.filter(r => r.domain.toLowerCase() === filters.domain?.toLowerCase());
    }
    if (filters?.fundingRequest) {
      list = list.filter(r => r.fundingRequest);
    }
    if (filters?.collaborationOpen) {
      list = list.filter(r => r.collaborationOpen);
    }
    if (filters?.authorUsername) {
      list = list.filter(r => r.posterUsername.toLowerCase() === filters.authorUsername?.toLowerCase());
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.abstract.toLowerCase().includes(q) ||
        r.keywords.some(k => k.toLowerCase().includes(q)) ||
        r.authors.some(a => a.toLowerCase().includes(q))
      );
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
    return Array.from(this.collabInquiries.values())
      .filter(c => c.researchId === researchId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
