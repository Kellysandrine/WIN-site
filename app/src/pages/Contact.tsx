import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/SiteSections';
export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  } return <><PageHero eyebrow="Contact World Intermedia Network" title="Your next step starts with a conversation." intro="Looking for HR consulting, communication services or corporate event support in Rwanda? Tell us about your organisation and what you want to achieve." image="hr" alt="Illustrative professional consultation"/><section className="win-section win-light"><div className="win-container win-contact-grid"><div><p className="win-eyebrow">Let’s hear your brief</p><h2>Good work starts<br />with understanding.</h2><p>You do not need a fully developed plan to get in touch. A clear description of the challenge, your audience and the support you are looking for is a useful starting point.</p><div className="win-contact-details"><a href="mailto:info@winhumancapital.com"><Mail /><span><strong>Email us</strong>info@winhumancapital.com</span></a><a href="tel:+250781886037"><Phone /><span><strong>Call our team</strong>(+250) 781 886 037</span></a><div><MapPin /><span><strong>Find us in Kigali</strong>Kibagabaga, KG 19, 301st<br />Trinity Corner House, Kigali, Rwanda</span></div></div><div className="win-brief-note"><h3>Helpful details to include</h3><ul><li>Your organisation and the service you need</li><li>The objective, audience or people involved</li><li>Your preferred timeline and indicative budget</li><li>Any key deliverables or requirements</li></ul></div></div><form className="win-contact-form" onSubmit={submit} aria-busy={status === 'sending'}><h3>Tell us what you have in mind.</h3><p>Send your enquiry directly to our team using the form below.</p><div className="win-form-row"><label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" maxLength={120} required placeholder="Full name"/></label><label htmlFor="contact-organisation">Organisation<input id="contact-organisation" name="organisation" autoComplete="organization" maxLength={200} placeholder="Organisation name"/></label></div><label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@organisation.com"/></label><label htmlFor="contact-service">How can we help?<select id="contact-service" name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Human resources</option><option>Communication & media production</option><option>Corporate events</option><option>A combination of services</option></select></label><label htmlFor="contact-message">Your brief<textarea id="contact-message" name="message" rows={6} maxLength={10000} required placeholder="Tell us about your project, goals and timing…"/></label><div style={{ display: 'none' }} aria-hidden="true"><label htmlFor="contact-website">Website<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></label></div><p className="win-form-note">Your enquiry will be sent to info@winhumancapital.com.</p><button className="win-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={18}/></button>{status === 'success' && <p className="win-form-feedback" role="status">Thank you. Your enquiry has been sent to our team.</p>}{status === 'error' && <p className="win-form-feedback" role="alert">We could not send your enquiry. Your details are still here so you can try again, or call (+250) 781 886 037.</p>}</form></div></section></>; }
