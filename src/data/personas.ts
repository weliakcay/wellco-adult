import personasData from './personas.json';
import { Persona, PersonaType, PersonaStats } from '@/types/persona';

export const ALL_PERSONAS: Persona[] = personasData.personas.map(p => ({
  ...p,
  createdAt: new Date(p.createdAt),
  updatedAt: new Date(p.updatedAt)
})) as Persona[];

// Get all experts (Dr. Seren, Freud, Jung, Esther Perel)
export function getExperts(): Persona[] {
  return ALL_PERSONAS.filter(p => p.type === 'expert');
}

// Get all doll personas
export function getDolls(): Persona[] {
  return ALL_PERSONAS.filter(p => p.type === 'doll');
}

// Get featured personas
export function getFeaturedPersonas(limit?: number): Persona[] {
  const featured = ALL_PERSONAS.filter(p => p.isFeatured && p.isActive);
  return limit ? featured.slice(0, limit) : featured;
}

// Get persona by slug
export function getPersonaBySlug(slug: string): Persona | undefined {
  return ALL_PERSONAS.find(p => p.slug === slug);
}

// Get persona by ID
export function getPersonaById(id: string): Persona | undefined {
  return ALL_PERSONAS.find(p => p.id === id);
}

// Get AI-enabled personas
export function getAIEnabledPersonas(): Persona[] {
  return ALL_PERSONAS.filter(p => p.aiEnabled && p.isActive);
}

// Get personas by type
export function getPersonasByType(type: PersonaType): Persona[] {
  return ALL_PERSONAS.filter(p => p.type === type && p.isActive);
}

// Get most popular personas (by consultation count)
export function getMostPopularPersonas(limit: number = 6): Persona[] {
  return [...ALL_PERSONAS]
    .filter(p => p.isActive)
    .sort((a, b) => (b.consultationCount || 0) - (a.consultationCount || 0))
    .slice(0, limit);
}

// Get highest rated personas
export function getHighestRatedPersonas(limit: number = 6): Persona[] {
  return [...ALL_PERSONAS]
    .filter(p => p.isActive && p.rating)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

// Get personas that create content
export function getContentCreators(): Persona[] {
  return ALL_PERSONAS.filter(p => p.createsContent && p.isActive);
}

// Get personas by blog post ID
export function getPersonasByBlogPost(postId: string): Persona[] {
  return ALL_PERSONAS.filter(p =>
    p.blogPosts && p.blogPosts.includes(postId)
  );
}

// Search personas
export function searchPersonas(query: string): Persona[] {
  const lowerQuery = query.toLowerCase();
  return ALL_PERSONAS.filter(p =>
    p.isActive && (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.title.toLowerCase().includes(lowerQuery) ||
      p.tagline.toLowerCase().includes(lowerQuery) ||
      p.bio.toLowerCase().includes(lowerQuery) ||
      p.specialty?.some(s => s.toLowerCase().includes(lowerQuery))
    )
  );
}

// Get persona statistics
export function getPersonaStats(): PersonaStats {
  const experts = getExperts();
  const dolls = getDolls();
  const totalConsultations = ALL_PERSONAS.reduce((sum, p) => sum + (p.consultationCount || 0), 0);
  const activeNow = ALL_PERSONAS.filter(p => p.availability === 'available').length;

  return {
    totalExperts: experts.length,
    totalDolls: dolls.length,
    totalConsultations,
    activeNow
  };
}

// Get related personas (based on specialty/type)
export function getRelatedPersonas(persona: Persona, limit: number = 3): Persona[] {
  return ALL_PERSONAS
    .filter(p =>
      p.id !== persona.id &&
      p.isActive &&
      (
        p.type === persona.type ||
        p.specialty?.some(s => persona.specialty?.includes(s))
      )
    )
    .slice(0, limit);
}

// Get available personas for chat
export function getAvailableForChat(): Persona[] {
  return ALL_PERSONAS.filter(p =>
    p.aiEnabled &&
    p.isActive &&
    p.availability === 'available'
  );
}
