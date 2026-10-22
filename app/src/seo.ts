import { projects } from './data/projects';
import { services } from './content/services';
export const origin = 'https://winhumancapital.com';
export function metadata(path: string) {
    const service = services.find(s => s.path === path);
    const project = projects.find(p => path === `/projects/${p.id}`);
    const pages: Record<string, [
        string,
        string
    ]> = {
        '/': ['HR, Communication & Events in Rwanda', 'World Intermedia Network brings together human resource consulting, communication, media production and event management in Kigali, Rwanda. Explore our services.'],
        '/about': ['About World Intermedia Network', 'Meet World Intermedia Network: a Kigali-based firm connecting people, stories and experiences through HR, communication and event services in Rwanda.'],
        '/services': ['HR, Communication & Event Services', 'Explore recruitment, HR consulting, media production, communication strategy and event management services from World Intermedia Network in Kigali, Rwanda.'],
        '/contact': ['Contact Our Kigali Team', 'Discuss your recruitment, communication, media production or event brief with World Intermedia Network in Kigali, Rwanda. Contact our team to get started.'],
        '/projects': ['Projects & Selected Work', 'Explore selected communication and event projects from World Intermedia Network, including documentaries, campaigns, conferences and corporate events.']
    };
    const [title, description] = service ? [service.label + ' in Kigali, Rwanda', service.intro] : project ? [project.title, project.shortDesc] : pages[path] || ['Page not found', 'Explore World Intermedia Network’s HR, communication and event services.'];
    return { title: title + ' | World Intermedia Network', description, canonical: origin + (path === '/' ? '' : path) };
}
export const siteRoutes = ['/', '/about', '/services', '/contact', '/projects', ...services.map(s => s.path), ...projects.map(p => `/projects/${p.id}`)];
