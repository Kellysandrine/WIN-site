// Restored from the original communication page's published partner list.
const partners = [
  'RBC', 'FHI 360', 'PSI Rwanda', 'MTN Rwanda', 'RSSB',
  'COGEBANK', 'INTERSEC', 'Lux-Development', 'Georgetown', 'RCN Justice',
];

export default function CommunicationPartners() {
  return (
    <section className="win-section win-light win-partners" aria-labelledby="communication-partners-title">
      <div className="win-container">
        <h2 id="communication-partners-title">Our <span>Partners</span></h2>
        <p>Organisations we’ve collaborated with</p>
        <ul className="win-partner-grid" aria-label="Our partners">
          {partners.map(partner => <li key={partner}>{partner}</li>)}
        </ul>
      </div>
    </section>
  );
}
