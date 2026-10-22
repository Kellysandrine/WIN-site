import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

// Restored from the original communication page's published partner list.
const partners = [
  'RBC', 'FHI 360', 'PSI Rwanda', 'MTN Rwanda', 'RSSB',
  'COGEBANK', 'INTERSEC', 'Lux-Development', 'Georgetown', 'RCN Justice',
];

export default function CommunicationPartners() {
  return (
    <section className="win-section win-navy" aria-labelledby="communication-partners-title">
      <div className="win-container">
        <div className="win-section-head">
          <div>
            <p className="win-eyebrow">Our collaborations</p>
            <h2 id="communication-partners-title">Organisations we’ve<br />worked with.</h2>
          </div>
          <p>Our communication experience includes collaborations with these organisations. Explore selected projects to learn more about our work.</p>
        </div>
        <ul className="win-partner-grid" aria-label="Organisations we have collaborated with">
          {partners.map(partner => <li key={partner}>{partner}</li>)}
        </ul>
        <Link className="win-text-link" to="/projects">Explore our work <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
