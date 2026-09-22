import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode, ComponentType } from 'react';
import * as Icons from 'lucide-react';

// ---------------- Types ----------------
export type Category = 'communication' | 'events';

export interface Project {
  id: string;
  title: string;
  category: Category;
  client: string;
  image: string;
  shortDesc: string;
  overview: string;
  deliverables: string[];
  year: string;
}

export interface IconItem { icon: string; title: string }
export interface Step { number: string; title: string; icon: string }

export interface ServicePageData {
  name: string;
  path: string;
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  heroImage: string;
  offerTitle: string;
  offerAccent: string;
  offerSubtitle: string;
  items: IconItem[];
  processTitle: string;
  processAccent: string;
  processSubtitle: string;
  steps: Step[];
}

export interface CommunicationPageData extends ServicePageData {
  productionItems: IconItem[];
  expertise: IconItem[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteContent {
  home: {
    heroServices: { title: string; path: string; icon: string; desc: string }[];
    features: { icon: string; title: string; desc: string }[];
  };
  about: {
    stats: { number: string; label: string; icon: string }[];
    values: IconItem[];
    story: string;
    vision: string;
    mission: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: string;
    socials: { linkedin: string; facebook: string; twitter: string; instagram: string };
  };
  services: {
    hr: ServicePageData;
    events: ServicePageData;
    communication: CommunicationPageData;
  };
  projects: Project[];
}

// ---------------- Icon helpers ----------------
export const ICON_CHOICES = [
  'Users', 'Calendar', 'Megaphone', 'Award', 'Clock', 'DollarSign', 'Target', 'Heart',
  'TrendingUp', 'Shield', 'Eye', 'Globe', 'Lightbulb', 'Handshake', 'UserPlus',
  'GraduationCap', 'FileCheck', 'Headphones', 'Search', 'ClipboardCheck', 'BookOpen',
  'BarChart3', 'Sparkles', 'Palette', 'Monitor', 'Mic', 'PartyPopper', 'Building2',
  'Camera', 'Wrench', 'Rocket', 'Star', 'Scale', 'Leaf', 'Video', 'Share2',
  'Phone', 'Mail', 'MapPin',
] as const;

export const iconFor = (name: string): ComponentType<{ className?: string }> =>
  (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[name] ?? Icons.Circle;

// ---------------- Default content (seeded from your current site) ----------------
export const DEFAULT_CONTENT: SiteContent = {
  home: {
    heroServices: [
      { title: 'HR Services', path: '/hr-services', icon: 'Users', desc: 'Comprehensive HR solutions' },
      { title: 'Corporate Events', path: '/events-services', icon: 'Calendar', desc: 'Memorable brand experiences' },
      { title: 'Communication', path: '/communication-services', icon: 'Megaphone', desc: 'Impactful C4D campaigns' },
    ],
    features: [
      { icon: 'Award', title: 'Professional Team', desc: 'Experienced experts' },
      { icon: 'DollarSign', title: 'Fair Prices', desc: 'Competitive rates' },
      { icon: 'Clock', title: '24/7 Support', desc: 'Always available' },
      { icon: 'TrendingUp', title: 'Results Driven', desc: 'Measurable impact' },
      { icon: 'Shield', title: 'Risk Management', desc: 'Stay compliant' },
      { icon: 'Heart', title: 'Women Empowerment', desc: 'Inclusive growth' },
    ],
  },
  about: {
    stats: [
      { number: '13+', label: 'Years', icon: 'Award' },
      { number: '500+', label: 'Clients', icon: 'Users' },
      { number: '50+', label: 'Events', icon: 'Globe' },
      { number: '3', label: 'Services', icon: 'TrendingUp' },
    ],
    values: [
      { icon: 'Award', title: 'Excellence' },
      { icon: 'Shield', title: 'Integrity' },
      { icon: 'Lightbulb', title: 'Innovation' },
      { icon: 'Heart', title: 'Inclusivity' },
      { icon: 'Handshake', title: 'Partnership' },
      { icon: 'Users', title: 'Empowerment' },
    ],
    story: 'Since 2011, WIN Human Capital has been dedicated to enhancing people\'s capacity and maximizing ROI. We offer tailored HR solutions, event management, and communication services.',
    vision: 'TODO: paste your current Vision text here (from About.tsx) — then it becomes editable in the dashboard.',
    mission: 'TODO: paste your current Mission text here (from About.tsx) — then it becomes editable in the dashboard.',
  },
  contact: {
    address: 'Kibagabaga, KG 19, 301st, Trinity Corner House, Kigali - Rwanda',
    phone: '+250 788 000 000', // TODO: replace with your real phone (shown on Contact page)
    email: 'info@winhumaancapital.rw', // TODO: replace with your real email
    hours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    socials: { linkedin: '#', facebook: '#', twitter: '#', instagram: '#' },
  },
  services: {
    hr: {
      name: 'HR Services', path: '/hr-services',
      heroTitle: 'HR', heroAccent: 'Services',
      heroSubtitle: 'Comprehensive human resource solutions to build and manage your dream team.',
      heroImage: '/hr-services.jpg',
      offerTitle: 'What We', offerAccent: 'Offer',
      offerSubtitle: 'End-to-end HR services for your organization',
      items: [
        { icon: 'Users', title: 'Recruitment & Talent Acquisition' },
        { icon: 'UserPlus', title: 'Onboarding & Orientation' },
        { icon: 'DollarSign', title: 'Payroll Administration' },
        { icon: 'Heart', title: 'Employee Relations' },
        { icon: 'GraduationCap', title: 'Training & Development' },
        { icon: 'Shield', title: 'Compliance & Risk' },
        { icon: 'FileCheck', title: 'Performance Management' },
        { icon: 'Headphones', title: 'HR Consulting' },
        { icon: 'Users', title: 'Team Building' },
      ],
      processTitle: 'How We', processAccent: 'Work',
      processSubtitle: 'From assessment to evaluation, we handle it all',
      steps: [
        { number: '01', title: 'Assess', icon: 'Search' },
        { number: '02', title: 'Recruit', icon: 'UserPlus' },
        { number: '03', title: 'Screen', icon: 'ClipboardCheck' },
        { number: '04', title: 'Hire', icon: 'Handshake' },
        { number: '05', title: 'Train', icon: 'BookOpen' },
        { number: '06', title: 'Evaluate', icon: 'BarChart3' },
      ],
    },
    events: {
      name: 'Corporate Events', path: '/events-services',
      heroTitle: 'Corporate', heroAccent: 'Events',
      heroSubtitle: 'Creating memorable experiences that elevate your brand and engage your audience.',
      heroImage: '/events-services.jpg',
      offerTitle: 'Our', offerAccent: 'Services',
      offerSubtitle: 'Full-service event planning and management',
      items: [
        { icon: 'Palette', title: 'Event Design & Branding' },
        { icon: 'Mic', title: 'Conference Management' },
        { icon: 'PartyPopper', title: 'Gala & Celebration' },
        { icon: 'ClipboardCheck', title: 'Protocol Services' },
        { icon: 'Camera', title: 'Media Production' },
        { icon: 'Monitor', title: 'Virtual & Hybrid Events' },
        { icon: 'Building2', title: 'Venue Coordination' },
        { icon: 'Sparkles', title: 'Creative Concepts' },
      ],
      processTitle: 'How We', processAccent: 'Work',
      processSubtitle: 'From concept to completion, seamless execution',
      steps: [
        { number: '01', title: 'Concept', icon: 'Lightbulb' },
        { number: '02', title: 'Plan', icon: 'ClipboardCheck' },
        { number: '03', title: 'Design', icon: 'Palette' },
        { number: '04', title: 'Execute', icon: 'Wrench' },
        { number: '05', title: 'Launch', icon: 'Rocket' },
        { number: '06', title: 'Review', icon: 'Star' },
      ],
    },
    communication: {
      name: 'Communication', path: '/communication-services',
      heroTitle: '', heroAccent: 'Communication',
      heroSubtitle: 'Communication for Development — driving change in health, education, and governance.',
      heroImage: '/communication-services.jpg',
      offerTitle: 'What We', offerAccent: 'Produce',
      offerSubtitle: 'Content that drives change',
      items: [],
      productionItems: [
        { icon: 'Share2', title: 'Digital Contents' },
        { icon: 'Megaphone', title: 'Ads' },
        { icon: 'BookOpen', title: 'Fiction & Documentaries' },
      ],
      expertise: [
        { icon: 'Heart', title: 'Health' },
        { icon: 'GraduationCap', title: 'Education' },
        { icon: 'Scale', title: 'Governance' },
        { icon: 'Leaf', title: 'Development' },
      ],
      processTitle: 'How We', processAccent: 'Work',
      processSubtitle: 'From research to evaluation, full-cycle C4D',
      steps: [
        { number: '01', title: 'Research', icon: 'Search' },
        { number: '02', title: 'Strategy', icon: 'Lightbulb' },
        { number: '03', title: 'Design', icon: 'Palette' },
        { number: '04', title: 'Produce', icon: 'Video' },
        { number: '05', title: 'Distribute', icon: 'Share2' },
        { number: '06', title: 'Evaluate', icon: 'TrendingUp' },
      ],
    },
  },
  projects: [
    { id: 'rhcc-health-campaign', title: 'Health Awareness TV Campaigns', category: 'communication', client: 'Rwanda Health Communication Center', image: '/project-health-ads.jpg', shortDesc: 'TV advertisements for malaria, PMTCT, and condom use awareness', overview: 'Developed and produced a series of impactful TV advertisements targeting malaria prevention, prevention of mother-to-child transmission (PMTCT), and condom use awareness. The campaigns were broadcast nationally across major Rwandan TV channels, reaching millions of viewers and contributing to measurable behavior change in target communities.', deliverables: ['TV Commercial Production', 'Script Writing', 'Filming & Editing', 'Media Placement Strategy'], year: '2019' },
    { id: 'georgetown-documentary', title: 'Capitalization Documentary Film', category: 'communication', client: 'Georgetown University / FHI Rwanda', image: '/project-documentary.jpg', shortDesc: 'Documentary on program impact and community sensitization', overview: 'Produced a comprehensive capitalization documentary for FHI Rwanda that documented program achievements, community impact stories, and lessons learned. The film was used for donor reporting, stakeholder engagement, and as a sensitization tool across partner communities.', deliverables: ['Documentary Film', 'Impact Stories', 'Post-Production', 'Distribution Strategy'], year: '2020' },
    { id: 'rbc-arv-tools', title: 'ARV Adherence Documentary & Guide', category: 'communication', client: 'Maryland University / Rwanda Biomedical Center', image: '/project-documentary.jpg', shortDesc: 'Educational documentary and assessment guide for ARV adherence', overview: 'Created documentary tools and a comprehensive assessment guide to support ARV adherence programs in Rwanda. The materials were designed for healthcare workers and community health volunteers to improve patient education and treatment compliance rates.', deliverables: ['Documentary Films', 'Assessment Guide', 'Training Materials', 'Print Resources'], year: '2021' },
    { id: 'psi-fiction-campaign', title: 'Hygiene & Health Fiction Campaign', category: 'communication', client: 'PSI Rwanda', image: '/project-tv-commercial.jpg', shortDesc: 'Fiction film campaigns for hand washing and condom use', overview: 'Developed compelling fiction films combining entertainment with health education messaging. The campaigns focused on promoting hand washing hygiene and condom use through relatable storytelling, broadcast on TV and digital platforms.', deliverables: ['Fiction Films', 'TV Scripts', 'Social Media Content', 'Campaign Analytics'], year: '2022' },
    { id: 'rcn-sensitization', title: 'Justice & Democracy Sensitization Film', category: 'communication', client: 'RCN Justice et Démocratie', image: '/project-documentary.jpg', shortDesc: 'Documentary on justice and democracy sensitization', overview: 'Produced a sensitization documentary film for RCN Justice et Démocratie focusing on legal rights awareness, access to justice, and democratic participation in Rwandan communities.', deliverables: ['Documentary Film', 'Community Screenings', 'Educational Materials'], year: '2020' },
    { id: 'lux-educational-tools', title: 'Educational & Capitalization Tools', category: 'communication', client: 'Lux-Development Rwanda', image: '/project-health-ads.jpg', shortDesc: 'Posters, booklets, flyers, and documentary films', overview: "Developed a comprehensive suite of educational and capitalization tools including printable materials (posters, booklets, flyers) and documentary films for Lux-Development's health and development programs in Rwanda.", deliverables: ['Print Materials', 'Documentary Films', 'Visual Design', 'Content Strategy'], year: '2021' },
    { id: 'rssb-social-security', title: 'Social Security Media Campaign', category: 'communication', client: 'RSSB', image: '/project-tv-commercial.jpg', shortDesc: 'TV and radio advertisements for social security awareness', overview: 'Created persuasive TV and radio advertisements to increase public awareness of RSSB social security services, benefits enrollment, and member rights across Rwanda.', deliverables: ['TV Ads', 'Radio Ads', 'Media Planning', 'Campaign Monitoring'], year: '2022' },
    { id: 'bralirwa-beyond-stage', title: '"Beyond Stage" Documentary Series', category: 'communication', client: 'BRALIRWA', image: '/project-tv-commercial.jpg', shortDesc: 'Behind-the-scenes documentaries for Primus Guma Guma', overview: 'Conceptualized, developed, and produced the "Beyond Stage" documentary series for BRALIRWA\'s Primus Guma Guma Super Star talent competition, showcasing artist stories and behind-the-scenes moments.', deliverables: ['Concept Development', 'Documentary Production', 'Post-Production', 'Broadcast Distribution'], year: '2023' },
    { id: 'mtn-tv-ads', title: 'Brand TV Commercial Campaign', category: 'communication', client: 'MTN Rwanda', image: '/project-tv-commercial.jpg', shortDesc: 'TV commercial production for brand campaigns', overview: "Produced high-quality TV commercials for MTN Rwanda's marketing campaigns, from concept development through filming, post-production, and delivery for broadcast.", deliverables: ['Concept Development', 'TV Commercial Production', 'Post-Production', 'Media Delivery'], year: '2023' },
    { id: 'corporate-gala', title: 'Annual Corporate Gala Dinner', category: 'events', client: 'Confidential Corporate Client', image: '/project-gala-event.jpg', shortDesc: 'Full-service gala event planning and execution', overview: 'Planned and executed a prestigious annual gala dinner for 500+ guests, featuring custom stage design, entertainment coordination, catering management, and full audio-visual production. The event received outstanding feedback from attendees and stakeholders.', deliverables: ['Venue Selection', 'Stage Design', 'Catering Coordination', 'AV Production', 'Guest Management'], year: '2023' },
    { id: 'kigali-conference', title: 'Kigali Business Summit', category: 'events', client: 'Kigali Convention Centre', image: '/project-conference.jpg', shortDesc: 'Large-scale business conference with 800+ delegates', overview: 'Managed the full logistics and production of a major business summit bringing together 800+ delegates from across Africa. Services included registration management, speaker coordination, exhibition setup, live streaming, and post-event analytics.', deliverables: ['Event Planning', 'Registration System', 'Live Streaming', 'Exhibition Management', 'Post-Event Report'], year: '2024' },
    { id: 'women-leadership', title: 'Women Leadership Summit', category: 'events', client: 'WIN Human Capital Initiative', image: '/project-women-empowerment.jpg', shortDesc: 'Empowering women leaders across industries', overview: 'Organized a transformative women leadership summit featuring keynote speakers, workshops, and networking sessions. The event brought together 200+ professional women for a day of inspiration, skill-building, and career development.', deliverables: ['Event Concept', 'Speaker Management', 'Workshop Facilitation', 'Networking Program'], year: '2024' },
  ],
};

// ---------------- Context ----------------
interface SiteContextValue {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  resetContent: () => void;
  messages: ContactMessage[];
  addMessage: (m: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  patchMessage: (id: string, patch: Partial<ContactMessage>) => void;
  deleteMessage: (id: string) => void;
  settings: { password: string };
  setPassword: (p: string) => void;
  exportAll: () => string;
  importAll: (json: string) => boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const CONTENT_KEY = 'win_site_content_v1';
const MESSAGES_KEY = 'win_messages_v1';
const SETTINGS_KEY = 'win_admin_settings_v1';

function loadJSON<T extends object>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return { ...fallback, ...JSON.parse(raw) };
  } catch { /* corrupted -> fallback */ }
  return fallback;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => loadJSON(CONTENT_KEY, DEFAULT_CONTENT));
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try { return JSON.parse(localStorage.getItem(MESSAGES_KEY) ?? '[]'); } catch { return []; }
  });
  const [settings, setSettings] = useState(() => loadJSON(SETTINGS_KEY, { password: 'win2026' }));

  useEffect(() => { try { localStorage.setItem(CONTENT_KEY, JSON.stringify(content)); } catch { /* quota */ } }, [content]);
  useEffect(() => { try { localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages)); } catch { /* quota */ } }, [messages]);
  useEffect(() => { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* quota */ } }, [settings]);

  const value = useMemo<SiteContextValue>(() => ({
    content,
    setContent,
    resetContent: () => setContent(structuredClone(DEFAULT_CONTENT)),
    messages,
    addMessage: (m) => setMessages((prev) => [{
      ...m,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString(),
      read: false,
    }, ...prev]),
    patchMessage: (id, patch) => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m))),
    deleteMessage: (id) => setMessages((prev) => prev.filter((m) => m.id !== id)),
    settings,
    setPassword: (p) => setSettings((s) => ({ ...s, password: p })),
    exportAll: () => JSON.stringify({ content, messages }, null, 2),
    importAll: (json) => {
      try {
        const data = JSON.parse(json);
        if (data.content) setContent(data.content);
        if (Array.isArray(data.messages)) setMessages(data.messages);
        return true;
      } catch { return false; }
    },
  }), [content, messages, settings]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}
