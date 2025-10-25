/**
 * Section Data Configuration
 * 
 * Defines the structure and content for portfolio sections.
 * Each section has an ID, title, and subtitle.
 * 
 * Note: Most sections use custom components (Hero, About, etc.)
 * but this data structure is used for routing and fallback rendering.
 */

/**
 * Interface for section data structure
 */
export interface SectionData {
  /** Unique identifier for the section (used for routing and data-attributes) */
  id: string
  
  /** Section title */
  title: string
  
  /** Section subtitle/description */
  subtitle: string
}

/**
 * Array of all portfolio sections
 * Order determines scroll sequence and camera position indices
 */
export const sections: SectionData[] = [
  { id: 'hero', title: 'Design', subtitle: 'that speaks louder than words.' },
  { id: 'about', title: 'About Me', subtitle: 'Get to know me better' },
  { id: 'projects', title: 'My Projects', subtitle: 'Explore my collection of applications' },
  { id: 'experience', title: 'Experience', subtitle: 'My educational background and professional journey' },
  { id: 'footer', title: 'Get In Touch', subtitle: 'Let\'s connect and build something amazing together' },
]

