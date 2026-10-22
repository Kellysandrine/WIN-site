import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { metadata } from '../seo';
export default function SEO() { const { pathname } = useLocation(); useEffect(() => { const m = metadata(pathname); document.title = m.title; for (const [name, content] of [['description', m.description], ['og:title', m.title], ['og:description', m.description], ['og:url', m.canonical]]) {
    const attribute = name.startsWith('og:') ? 'property' : 'name';
    let el = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, name);
        document.head.append(el);
    }
    el.setAttribute('content', content);
} let canonical = document.head.querySelector('link[rel="canonical"]'); if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.append(canonical);
} canonical.setAttribute('href', m.canonical); }, [pathname]); return null; }
