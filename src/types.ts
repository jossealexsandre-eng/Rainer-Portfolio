export interface EducationEntry {
  id: string;
  period: string;
  periodJapanese?: string;
  institution: string;
  institutionJapanese?: string;
  field: string;
  fieldJapanese?: string;
  location?: string;
  locationJapanese?: string;
  isCurrent?: boolean;
  notes?: string;
  notesJapanese?: string;
  photos?: string[];
}

export interface ExperienceEntry {
  id: string;
  year: string;
  yearJapanese?: string;
  title: string;
  japaneseTitle?: string;
  shortDescription: string;
  shortDescriptionJapanese?: string;
  details?: string;
  detailsJapanese?: string;
  organization?: string;
  organizationJapanese?: string;
  photos?: string[];
}

export interface LanguageEntry {
  id: string;
  name: string;
  nameJapanese?: string;
  nativeName: string;
  level: string;
  levelJapanese?: string;
  levelBadge: string;
  levelBadgeJapanese?: string;
  note?: string;
  noteJapanese?: string;
}

export interface InternshipImage {
  id: string;
  url?: string;
  title: string;
  japaneseTitle?: string;
  subtitle?: string;
  subtitleJapanese?: string;
  caption: string;
  captionJapanese?: string;
  date: string;
  dateJapanese?: string;
  location: string;
  locationJapanese?: string;
  aspect: 'horizontal' | 'vertical' | 'square' | 'wide';
  category?: 'caddy' | 'daily' | 'activity' | 'all';
  objectPosition?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  japaneseName: string;
  category: 'linguistic' | 'professional';
  proficiencyBadge: string;
  proficiencyBadgeJapanese?: string;
  description: string;
  descriptionJapanese?: string;
  highlight?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  japaneseTitle: string;
  issuer: string;
  issuerJapanese: string;
  year: string;
  yearJapanese?: string;
  dateBadge: string;
  dateBadgeJapanese?: string;
  credentialId?: string;
  imageUrl?: string;
  category?: 'academic' | 'internship' | 'leadership';
  skills: string[];
  skillsJapanese?: string[];
  description: string;
  descriptionJapanese?: string;
}

export interface JourneyMilestone {
  id: string;
  step: number;
  period: string;
  periodJapanese?: string;
  location: string;
  locationJapanese: string;
  title: string;
  titleJapanese: string;
  kanjiTheme: string;
  description: string;
  descriptionJapanese?: string;
  tag: string;
  tagJapanese?: string;
  highlightNotes?: string;
  highlightNotesJapanese?: string;
}

export type SiteLanguage = 'ja' | 'en';

export interface PortfolioData {
  profile: {
    fullName: string;
    japaneseName?: string;
    title: string;
    titleJapanese?: string;
    subheadline: string;
    subheadlineJapanese?: string;
    summary: string;
    summaryJapanese?: string;
    portraitUrl?: string;
    hometown: string;
    hometownJapanese?: string;
    birthDate: string;
    birthDateJapanese?: string;
    university: string;
    universityJapanese?: string;
    fieldOfStudy: string;
    fieldOfStudyJapanese?: string;
    interest: string;
    interestJapanese?: string;
    personalStatement: string;
    personalStatementJapanese?: string;
  };
  education: EducationEntry[];
  experiences: ExperienceEntry[];
  languages: LanguageEntry[];
  skills: {
    linguistic: SkillItem[];
    professional: SkillItem[];
  };
  certificates: CertificateItem[];
  journey: JourneyMilestone[];
  internship: {
    title: string;
    japaneseTitle: string;
    subtitle: string;
    organization: string;
    organizationJapanese?: string;
    location: string;
    locationJapanese?: string;
    program: string;
    programJapanese?: string;
    period: string;
    periodJapanese?: string;
    heroImage?: string;
    heroCaption: string;
    heroCaptionJapanese?: string;
    storyHeadline: string;
    storyHeadlineJapanese?: string;
    storyIntro: string;
    storyIntroJapanese?: string;
    narratives: {
      experience: string;
      learning: string;
      reflection: string;
    };
    narrativesJapanese?: {
      experience: string;
      learning: string;
      reflection: string;
    };
    gallery: InternshipImage[];
    video: {
      title: string;
      titleJapanese?: string;
      url?: string;
      leftUrl?: string;
      rightUrl?: string;
      description: string;
      descriptionJapanese?: string;
      notes: string;
    };
  };
  personalInterest: {
    title: string;
    japaneseTitle: string;
    topic: string;
    topicJapanese?: string;
    description: string;
    descriptionJapanese?: string;
    imageUrl?: string;
  };
  contact: {
    email: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    instagram: string;
    linkedin: string;
    location: string;
    locationJapanese?: string;
  };
}
