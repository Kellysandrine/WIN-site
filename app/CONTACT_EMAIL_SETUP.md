# Contact form email delivery

The contact form posts to `/api/contact`, a Vercel Node.js Function in `app/api/contact.js`. It sends enquiries through Hostinger SMTP to the fixed recipient `info@winhumancapital.com`. The visitor's email is used only as Reply-To.

## Activate in Vercel

1. Confirm the `win` project's Root Directory is `app`, Framework Preset is Vite, build command is `npm run build`, and output directory is `dist`.
2. Under Settings → Environment Variables, add `SMTP_USER` with value `info@winhumancapital.com` and `SMTP_PASSWORD` with that mailbox's password. Save the password as a Secret for Production. Use separate non-production mailbox credentials for Preview if testing there. Do not put credentials into the source or any `VITE_` variable.
3. Deploy the change after configuring the variables. Keep existing website routing; make sure any catch-all rewrite does not intercept `/api/contact`.
4. Restore Hostinger MX records in the domain's authoritative Vercel DNS zone and apply Hostinger's account-specific SPF/DKIM settings. Confirm the mailbox is active and can receive email.
5. Submit an authorised test enquiry and confirm arrival in the mailbox, then verify Reply goes to the visitor. SMTP acceptance alone does not prove inbox delivery.

The endpoint validates required fields, service choices and size limits, rejects foreign browser origins, and discards a hidden bot field. It does not allow callers to select recipients. Configure Vercel Firewall rate limiting on POST `/api/contact` before enabling the public endpoint if spam becomes an issue. Missing credentials and delivery failures return errors and keep the visitor's form content intact.

## Checks

`node --test tests/contact.test.js` exercises delivery and failure behaviour with a mocked mail transport; no emails are sent. `npm run build` checks the frontend and prerendering. A full delivery test requires configured credentials and the deployed Vercel endpoint.
