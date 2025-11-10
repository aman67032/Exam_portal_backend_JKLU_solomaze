Paper Portal Email Service (Nodemailer)

Setup
1) Create .env (see example below)
2) Install deps: npm install
3) Run service: npm start (defaults to http://localhost:4000)
4) In Python backend set: EMAIL_SERVICE_URL=http://localhost:4000

.env example
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxxxxxxxxxxxxxxxxxx
SMTP_SECURE=false
FROM_EMAIL=Paper Portal <no-reply@yourdomain.com>
PORT=4000

Endpoints
- GET /health  -> verifies SMTP connection
- POST /send-email  JSON: { to, from?, subject, html?, text? }

