export interface ServiceContentItem {
  id: string;
  type: 'image' | 'text';
  value: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  items?: ServiceContentItem[];
}

export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface AboutContent {
  image: string;
  badge: string;
  title: string;
  paragraphs: string[];
  features: {
    title: string;
    description: string;
  }[];
}

export interface FooterContent {
  slogan: string;
  phone: string;
  email: string;
  address: string;
}

// New: Branding/Logo Configuration
export interface BrandingContent {
  logo: string;
  tagline: string;
}

// New: Navigation Labels
export interface NavigationContent {
  home: string;
  about: string;
  services: string;
  gallery: string;
  references: string;
  contact: string;
}

// New: References
export interface Reference {
  id: string;
  name: string;
  location?: string;
}

// New: Services Section Titles & Texts
export interface ServicesSectionContent {
  badge: string;
  title: string;
  description: string;
  cta: string;
}

// New: Gallery Section Titles & Texts
export interface GallerySectionContent {
  title: string;
  button: string;
}

// New: Footer Section Labels
export interface FooterSectionContent {
  corporateTitle: string;
  contactTitle: string;
  corporateLinks: string[];
}

// New: WhatsApp Configuration
export interface WhatsAppContent {
  phone: string;
  message: string;
  image: string;
  isJumping: boolean;
  isShimmering: boolean;
}

// New: SEO Configuration
export interface SEOPageMeta {
  title: string;
  description: string;
}

export interface SEOContent {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  ogImage: string;
  pages: {
    home: SEOPageMeta;
    about: SEOPageMeta;
    services: SEOPageMeta;
    gallery: SEOPageMeta;
    references: SEOPageMeta;
    contact: SEOPageMeta;
  };
}

export interface SiteContent {
  hero: Slide[];
  about: AboutContent;
  services: Service[];
  projects: Project[];
  references: Reference[];
  footer: FooterContent;
  branding: BrandingContent;
  navigation: NavigationContent;
  servicesSection: ServicesSectionContent;
  gallerySection: GallerySectionContent;
  footerSection: FooterSectionContent;
  whatsapp: WhatsAppContent;
  seo: SEOContent;
}
