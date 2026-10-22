import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { metadata, siteRoutes, origin } from './seo';
const template = readFileSync('dist/index.html', 'utf8');
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const route of [...siteRoutes, '/404']) {
    const m = metadata(route);
    const html = renderToString(<StaticRouter location={route}><App /></StaticRouter>);
    const tags = `<meta name="description" content="${escape(m.description)}"><link rel="canonical" href="${m.canonical}"><meta property="og:title" content="${escape(m.title)}"><meta property="og:description" content="${escape(m.description)}"><meta property="og:url" content="${m.canonical}"><meta property="og:type" content="website"><meta property="og:image" content="${origin}/images/stock-collaboration-1920.webp"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#0022E8"><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'World Intermedia Network', url: origin, image: origin + '/logo.PNG', areaServed: 'Rwanda', address: { '@type': 'PostalAddress', addressLocality: 'Kigali', addressCountry: 'RW' }, email: 'info@winhumancapital.com' })}</script>`;
    const output = template.replace(/<title>.*?<\/title>/, `<title>${escape(m.title)}</title>${tags}`).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    const dir = 'dist' + (route === '/' ? '' : route);
    mkdirSync(dir, { recursive: true });
    writeFileSync(dir + '/index.html', output);
    if (route === '/404')
        writeFileSync('dist/404.html', output);
}
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${siteRoutes.map(r => `<url><loc>${origin}${r === '/' ? '' : r}</loc></url>`).join('')}</urlset>`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Prerendered ${siteRoutes.length} pages.`);
