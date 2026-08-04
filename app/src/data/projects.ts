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

export const projects: Project[] = [
  {
    id: 'rhcc-health-campaign',
    title: 'Health Awareness TV Campaigns',
    category: 'communication',
    client: 'Rwanda Health Communication Center',
    image: '/project-health-ads.jpg',
    shortDesc: 'TV advertisements for malaria, PMTCT, and condom use awareness',
    overview: 'Developed and produced a series of impactful TV advertisements targeting malaria prevention, prevention of mother-to-child transmission (PMTCT), and condom use awareness. The campaigns were broadcast nationally across major Rwandan TV channels, reaching millions of viewers and contributing to measurable behavior change in target communities.',
    deliverables: ['TV Commercial Production', 'Script Writing', 'Filming & Editing', 'Media Placement Strategy'],
    year: '2019',
  },
  {
    id: 'georgetown-documentary',
    title: 'Capitalization Documentary Film',
    category: 'communication',
    client: 'Georgetown University / FHI Rwanda',
    image: '/project-documentary.jpg',
    shortDesc: 'Documentary on program impact and community sensitization',
    overview: 'Produced a comprehensive capitalization documentary for FHI Rwanda that documented program achievements, community impact stories, and lessons learned. The film was used for donor reporting, stakeholder engagement, and as a sensitization tool across partner communities.',
    deliverables: ['Documentary Film', 'Impact Stories', 'Post-Production', 'Distribution Strategy'],
    year: '2020',
  },
  {
    id: 'rbc-arv-tools',
    title: 'ARV Adherence Documentary & Guide',
    category: 'communication',
    client: 'Maryland University / Rwanda Biomedical Center',
    image: '/project-documentary.jpg',
    shortDesc: 'Educational documentary and assessment guide for ARV adherence',
    overview: 'Created documentary tools and a comprehensive assessment guide to support ARV adherence programs in Rwanda. The materials were designed for healthcare workers and community health volunteers to improve patient education and treatment compliance rates.',
    deliverables: ['Documentary Films', 'Assessment Guide', 'Training Materials', 'Print Resources'],
    year: '2021',
  },
  {
    id: 'psi-fiction-campaign',
    title: 'Hygiene & Health Fiction Campaign',
    category: 'communication',
    client: 'PSI Rwanda',
    image: '/project-tv-commercial.jpg',
    shortDesc: 'Fiction film campaigns for hand washing and condom use',
    overview: 'Developed compelling fiction films combining entertainment with health education messaging. The campaigns focused on promoting hand washing hygiene and condom use through relatable storytelling, broadcast on TV and digital platforms.',
    deliverables: ['Fiction Films', 'TV Scripts', 'Social Media Content', 'Campaign Analytics'],
    year: '2022',
  },
  {
    id: 'rcn-sensitization',
    title: 'Justice & Democracy Sensitization Film',
    category: 'communication',
    client: 'RCN Justice et Démocratie',
    image: '/project-documentary.jpg',
    shortDesc: 'Documentary on justice and democracy sensitization',
    overview: 'Produced a sensitization documentary film for RCN Justice et Démocratie focusing on legal rights awareness, access to justice, and democratic participation in Rwandan communities.',
    deliverables: ['Documentary Film', 'Community Screenings', 'Educational Materials'],
    year: '2020',
  },
  {
    id: 'lux-educational-tools',
    title: 'Educational & Capitalization Tools',
    category: 'communication',
    client: 'Lux-Development Rwanda',
    image: '/project-health-ads.jpg',
    shortDesc: 'Posters, booklets, flyers, and documentary films',
    overview: 'Developed a comprehensive suite of educational and capitalization tools including printable materials (posters, booklets, flyers) and documentary films for Lux-Development\'s health and development programs in Rwanda.',
    deliverables: ['Print Materials', 'Documentary Films', 'Visual Design', 'Content Strategy'],
    year: '2021',
  },
  {
    id: 'rssb-social-security',
    title: 'Social Security Media Campaign',
    category: 'communication',
    client: 'RSSB',
    image: '/project-tv-commercial.jpg',
    shortDesc: 'TV and radio advertisements for social security awareness',
    overview: 'Created persuasive TV and radio advertisements to increase public awareness of RSSB social security services, benefits enrollment, and member rights across Rwanda.',
    deliverables: ['TV Ads', 'Radio Ads', 'Media Planning', 'Campaign Monitoring'],
    year: '2022',
  },
  {
    id: 'bralirwa-beyond-stage',
    title: '"Beyond Stage" Documentary Series',
    category: 'communication',
    client: 'BRALIRWA',
    image: '/project-tv-commercial.jpg',
    shortDesc: 'Behind-the-scenes documentaries for Primus Guma Guma',
    overview: 'Conceptualized, developed, and produced the "Beyond Stage" documentary series for BRALIRWA\'s Primus Guma Guma Super Star talent competition, showcasing artist stories and behind-the-scenes moments.',
    deliverables: ['Concept Development', 'Documentary Production', 'Post-Production', 'Broadcast Distribution'],
    year: '2023',
  },
  {
    id: 'corporate-gala',
    title: 'Annual Corporate Gala Dinner',
    category: 'events',
    client: 'Confidential Corporate Client',
    image: '/project-gala-event.jpg',
    shortDesc: 'Full-service gala event planning and execution',
    overview: 'Planned and executed a prestigious annual gala dinner for 500+ guests, featuring custom stage design, entertainment coordination, catering management, and full audio-visual production. The event received outstanding feedback from attendees and stakeholders.',
    deliverables: ['Venue Selection', 'Stage Design', 'Catering Coordination', 'AV Production', 'Guest Management'],
    year: '2023',
  },
  {
    id: 'kigali-conference',
    title: 'Kigali Business Summit',
    category: 'events',
    client: 'Kigali Convention Centre',
    image: '/project-conference.jpg',
    shortDesc: 'Large-scale business conference with 800+ delegates',
    overview: 'Managed the full logistics and production of a major business summit bringing together 800+ delegates from across Africa. Services included registration management, speaker coordination, exhibition setup, live streaming, and post-event analytics.',
    deliverables: ['Event Planning', 'Registration System', 'Live Streaming', 'Exhibition Management', 'Post-Event Report'],
    year: '2024',
  },
  {
    id: 'women-leadership',
    title: 'Women Leadership Summit',
    category: 'events',
    client: 'WIN Human Capital Initiative',
    image: '/project-women-empowerment.jpg',
    shortDesc: 'Empowering women leaders across industries',
    overview: 'Organized a transformative women leadership summit featuring keynote speakers, workshops, and networking sessions. The event brought together 200+ professional women for a day of inspiration, skill-building, and career development.',
    deliverables: ['Event Concept', 'Speaker Management', 'Workshop Facilitation', 'Networking Program'],
    year: '2024',
  },
  {
    id: 'mtn-tv-ads',
    title: 'Brand TV Commercial Campaign',
    category: 'communication',
    client: 'MTN Rwanda',
    image: '/project-tv-commercial.jpg',
    shortDesc: 'TV commercial production for brand campaigns',
    overview: 'Produced high-quality TV commercials for MTN Rwanda\'s marketing campaigns, from concept development through filming, post-production, and delivery for broadcast.',
    deliverables: ['Concept Development', 'TV Commercial Production', 'Post-Production', 'Media Delivery'],
    year: '2023',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export const getProjectsByCategory = (category: Category): Project[] => {
  return projects.filter((p) => p.category === category);
};
