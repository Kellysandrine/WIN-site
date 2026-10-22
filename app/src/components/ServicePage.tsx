import CommunicationPartners from './CommunicationPartners';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { services, getService, type ServiceKey } from '../content/services';
import { CTA, FAQ, PageHero } from './SiteSections';
export default function ServicePage({ serviceKey }: {
    serviceKey: ServiceKey;
}) {
    const s = getService(serviceKey);
    return <>
    <PageHero eyebrow={s.label + ' · Kigali, Rwanda'} title={s.title} intro={s.intro} image={s.image} alt={s.imageAlt}/>
    <section className="win-section win-light"><div className="win-container win-intro-grid"><div><p className="win-eyebrow">The way we see it</p><h2>{s.heading}</h2></div><div>{s.body.map(p => <p key={p}>{p}</p>)}</div></div></section>
    <section className="win-section win-navy"><div className="win-container"><div className="win-section-head"><div><p className="win-eyebrow">How we can help</p><h2>Expertise shaped<br />around your needs.</h2></div><p>Choose focused support for a specific requirement, or connect several services into one coordinated assignment.</p></div><div className="win-offer-grid">{s.offers.map((o, i) => <article className="win-offer" key={o.title}><span className="win-number">0{i + 1}</span><h3>{o.title}</h3><p>{o.text}</p></article>)}</div></div></section>
    <section className="win-section win-blue"><div className="win-container"><p className="win-eyebrow">A clear path forward</p><h2>From your brief<br />to practical delivery.</h2><div className="win-process">{s.process.map((p, i) => <div key={p.title}><span>0{i + 1}</span><h3>{p.title}</h3><p>{p.text}</p></div>)}</div></div></section>
    {serviceKey === 'communication' && <CommunicationPartners />}
    <FAQ items={s.faqs}/><section className="win-section win-navy"><div className="win-container"><p className="win-eyebrow">Connected capabilities</p><h2>One brief. More possibilities.</h2><div className="win-related-services">{services.filter(x => x.key !== s.key).map(x => <Link key={x.key} to={x.path}><div><h3>{x.label}</h3><p>{x.heading}</p></div><ArrowUpRight aria-hidden="true"/></Link>)}</div></div></section><CTA />
    </>;
}
