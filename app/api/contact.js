import nodemailer from 'nodemailer';

const recipient = 'info@winhumancapital.com';
const services = new Set(['Human resources', 'Communication & media production', 'Corporate events', 'A combination of services']);
const allowedOrigins = new Set(['https://winhumancapital.com', 'https://www.winhumancapital.com']);

// Dependency injection lets tests verify delivery behaviour without sending mail.
export function createHandler({ env = process.env, createTransport = nodemailer.createTransport } = {}) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ ok: false });
    }
    const origin = req.headers.origin;
    const previewOrigin = env.VERCEL_ENV === 'preview' && env.VERCEL_URL ? `https://${env.VERCEL_URL}` : null;
    if (origin && !allowedOrigins.has(origin) && origin !== previewOrigin) return res.status(403).json({ ok: false });
    if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ ok: false });
    let body;
    try {
      const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      if (!raw || Buffer.byteLength(raw) > 20000) return res.status(413).json({ ok: false });
      body = JSON.parse(raw);
    } catch {
      return res.status(400).json({ ok: false });
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ ok: false });
    // Bots filling the invisible field are discarded without sending anything.
    if (body.website) return res.status(200).json({ ok: true });
    const { name, organisation = '', email, service, message } = body;
    const validText = (value, max, required = true) => typeof value === 'string' && value.length <= max && (!required || value.trim().length > 0);
    if (!validText(name, 120) || !validText(organisation, 200, false) || !validText(email, 254) ||
        !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(name + email) ||
        !services.has(service) || !validText(message, 10000)) return res.status(400).json({ ok: false });
    if (!env.SMTP_USER || !env.SMTP_PASSWORD) return res.status(503).json({ ok: false });
    const transport = createTransport({
      host: 'smtp.hostinger.com', port: 465, secure: true,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    });
    try {
      const result = await transport.sendMail({
        from: { name: 'World Intermedia Network website', address: env.SMTP_USER },
        to: recipient,
        replyTo: { name: name.trim(), address: email.trim() },
        subject: `Website enquiry: ${service}`,
        text: `Name: ${name.trim()}\nOrganisation: ${organisation.trim()}\nEmail: ${email.trim()}\nService: ${service}\n\n${message.trim()}`,
        disableFileAccess: true, disableUrlAccess: true,
      });
      if (!result.accepted?.some(address => String(address).toLowerCase() === recipient)) throw new Error('Recipient not accepted');
      return res.status(200).json({ ok: true });
    } catch {
      // Do not log enquiry contents, SMTP credentials or provider error details.
      return res.status(502).json({ ok: false });
    } finally {
      transport.close();
    }
  };
}

export default createHandler();
