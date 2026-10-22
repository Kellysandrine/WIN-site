import { stockPhotoAlt } from '../content/stockPhotos';
import { Link } from 'react-router';
import { ArrowUpRight, ArrowRight, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
export function Photo({ name, alt, className = '', priority = false }: {
    name: string;
    alt: string;
    className?: string;
    priority?: boolean;
}) { return <img src={`/images/stock-${name}-960.webp`} srcSet={`/images/stock-${name}-640.webp 640w, /images/stock-${name}-960.webp 960w, /images/stock-${name}-1920.webp 1920w`} sizes={className.includes("win-cover") ? "100vw" : "(max-width: 767px) 100vw, 60vw"} width="1920" height="1280" alt={stockPhotoAlt[name] || alt} className={className} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"/>; }
export function Button({ to, children, secondary = false }: {
    to: string;
    children: ReactNode;
    secondary?: boolean;
}) { return <Link to={to} className={`win-button ${secondary ? 'win-button-outline' : ''}`}>{children}<ArrowUpRight size={18} aria-hidden="true"/></Link>; }
export function PageHero({ eyebrow, title, intro, image, alt }: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
    alt: string;
}) { return <section className="win-page-hero"><div className="win-container win-hero-grid"><div><p className="win-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="win-lead">{intro}</p><Button to="/contact">Let’s talk about your project</Button></div><div className="win-hero-photo"><Photo name={image} alt={alt} priority/><span className="win-photo-tag">People. Stories. Possibilities.</span></div></div></section>; }
export function CTA({ title = 'Let’s move your next idea forward.', text = 'Tell us what you want to achieve. We’ll help you explore the people, communication or event support that fits your brief.' }: {
    title?: string;
    text?: string;
}) { return <section className="win-cta"><div className="win-container"><div><p className="win-eyebrow">Start a conversation</p><h2>{title}</h2><p>{text}</p></div><Button to="/contact">Talk to World Intermedia Network</Button></div></section>; }
export function FAQ({ items }: {
    items: {
        q: string;
        a: string;
    }[];
}) { return <section className="win-section win-light"><div className="win-container win-faq-grid"><div><p className="win-eyebrow">A little more clarity</p><h2>Your questions,<br />answered.</h2><p>Have a specific brief in mind? <Link className="win-text-link" to="/contact">Speak with our team <ArrowRight size={16}/></Link></p></div><div>{items.map(item => <details key={item.q} className="win-faq"><summary>{item.q}<Plus size={20} aria-hidden="true"/></summary><p>{item.a}</p></details>)}</div></div></section>; }
