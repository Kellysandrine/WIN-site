import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../api/contact.js';

const valid = { name: 'Test Visitor', organisation: 'Example', email: 'visitor@example.com', service: 'Human resources', message: 'A test enquiry', website: '' };
async function submit({ body = valid, method = 'POST', origin = 'https://winhumancapital.com', env = { SMTP_USER: 'info@winhumancapital.com', SMTP_PASSWORD: 'test-only' }, failure = false, accepted = ['info@winhumancapital.com'] } = {}) {
  const sent = [];
  const res = { setHeader() {}, status(code) { this.code = code; return this; }, json(data) { this.data = data; return this; } };
  const handler = createHandler({ env, createTransport: () => ({ async sendMail(mail) { sent.push(mail); if (failure) throw Error('SMTP failed'); return { accepted }; }, close() {} }) });
  await handler({ method, headers: { origin, 'content-type': 'application/json' }, body }, res);
  return { res, sent };
}
test('sends to the fixed mailbox with the visitor as Reply-To', async () => {
  const { res, sent } = await submit({ body: { ...valid, to: 'attacker@example.com' } });
  assert.equal(res.code, 200);
  assert.equal(sent[0].to, 'info@winhumancapital.com');
  assert.equal(sent[0].from.address, 'info@winhumancapital.com');
  assert.equal(sent[0].replyTo.address, valid.email);
  assert.match(sent[0].text, /A test enquiry/);
});
test('invalid or oversized fields do not send', async () => {
  for (const patch of [{ email: 'bad' }, { email: 'a@example.com\r\nBcc: bad@example.com' }, { name: '' }, { message: 'x'.repeat(10001) }, { service: 'Unexpected' }]) {
    const { res, sent } = await submit({ body: { ...valid, ...patch } });
    assert.equal(res.code, 400);
    assert.equal(sent.length, 0);
  }
});
test('rejects malformed JSON and oversized payloads', async () => {
  assert.equal((await submit({ body: '{' })).res.code, 400);
  assert.equal((await submit({ body: { ...valid, extra: 'x'.repeat(20001) } })).res.code, 413);
});
test('rejects foreign origins and non-POST requests', async () => {
  assert.equal((await submit({ origin: 'https://other.example' })).res.code, 403);
  assert.equal((await submit({ method: 'GET' })).res.code, 405);
});
test('honeypot submissions do not send mail', async () => {
  const { sent } = await submit({ body: { ...valid, website: 'spam' } });
  assert.equal(sent.length, 0);
});
test('missing credentials and SMTP failures never report success', async () => {
  assert.equal((await submit({ env: {} })).res.code, 503);
  assert.equal((await submit({ failure: true })).res.code, 502);
  assert.equal((await submit({ accepted: [] })).res.code, 502);
});
