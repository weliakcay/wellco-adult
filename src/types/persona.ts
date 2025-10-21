export type PersonaType = 'expert' | 'doll' | 'author';

export type ExpertiseArea =
  | 'sexual-health'
  | 'psychology'
  | 'relationships'
  | 'wellness'
  | 'psychoanalysis'
  | 'therapy';

export interface Persona {
  id: string;
  slug: string;
  type: PersonaType;
  name: string;
  title: string;
  avatar: string;
  coverImage?: string;
  tagline: string;
  bio: string;
  specialty?: ExpertiseArea[];

  // Social proof
  consultationCount?: number;
  rating?: number;
  availability?: 'available' | 'busy' | 'offline';

  // AI Chat capabilities
  aiEnabled: boolean;
  aiProvider?: 'openai' | 'anthropic';
  aiModel?: string;
  systemPrompt?: string;
  sampleQuestions?: string[];

  // Content creation
  createsContent: boolean;
  blogPosts?: string[]; // Blog post IDs
  articles?: number;

  // For doll personas
  dollFeatures?: {
    height: string;
    measurements: string;
    material: string;
    brand: string;
    price: number;
    images: string[];
    personality: string;
    story: string;
    features: string[];
    productUrl?: string;
  };

  // Meta
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  personaId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PersonaStats {
  totalExperts: number;
  totalDolls: number;
  totalConsultations: number;
  activeNow: number;
}
