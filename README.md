# Aditi Singh — Portfolio (Full-Stack)

A production-ready personal portfolio website built with **React + Vite**, **Tailwind CSS**, **Node.js**, **Express.js**, **MongoDB Atlas (Mongoose)**, **Cloudinary** and **Framer Motion**. Includes a floating AI chatbot, smooth scrolling, page transitions, premium dark design and a full **Admin Dashboard** at /admin.

Inspired by the look, feel and interactions of [pszostak.pl](https://www.pszostak.pl/) (original code & assets are NOT copied — everything here is original and powered by my own content/resume).

## Features

### Public site
- Animated Hero with particles + role typewriter
- Smooth scroll + custom glow cursor + scroll progress bar
- Framer Motion reveal animations on every section
- Page transitions
- Sections: Hero, About, Skills, Projects, Experience, Education, Achievements, Research, Certifications, Contact (with working form saved to DB)
- **Floating AI chatbot** (keyword-based, lives off DB content; OpenAI can be added via env)
- Fully responsive, SEO-friendly (per-section meta via DB), social tags, Google Analytics support
- Resume download

### Admin dashboard (/admin)
- JWT login
- Edit Profile / About / SEO settings
- Full CRUD for: Projects, Skills, Experience, Education, Achievements, Research Papers, Certifications
- Reorder items (up/down)
- Publish / unpublish content
- Upload images to Cloudinary (URLs stored in DB)
- Replace Resume PDF (Cloudinary)
- View contact messages

### Security
- JWT auth + bcrypt password hashing
- Helmet, CORS, rate limiting (global + auth + chat)
- express-validator input validation
- Environment variables for all secrets
- Admin-only writes (public reads where appropriate)

## Folder Structure

`
portfolio-nv/
├── backend/
│   ├── config/        db.js, cloudinary.js
│   ├── controllers/   auth, profile, about, seo, contact, message, chat
│   ├── middleware/    authMiddleware, errorMiddleware, validate
│   ├── models/        User, Profile, About, Skill, Project, Experience,
│   │                  Education, Achievement, Research, Certification, Seo, Message
│   ├── routes/        auth, profile, about, projects, skills, experience,
│   │                  education, achievements, research, certifications, seo,
│   │                  contact, chat, messages, upload
│   ├── seed/          index.js   (seeds all content from the resume)
│   ├── utils/         asyncHandler, generateToken, crudFactory
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/        favicon.svg
│   ├── src/
│   │   ├── admin/     AuthContext, Login, Dashboard, CrudList, GenericForm,
│   │   │              ImageUpload, JsonField, forms.jsx, SingleEditor.jsx
│   │   ├── components/ Navbar, Footer, ChatBot, Cursor, PageTransition,
│   │   │              Particles, Reveal, ScrollProgress, SectionHeading
│   │   ├── context/   PortfolioContext.jsx
│   │   ├── hook/       useReveal, useScrollProgress
│   │   ├── lib/        api.js (axios client + helpers)
│   │   ├── pages/      Home.jsx, Admin.jsx
│   │   ├── sections/   Hero, About, Skills, Projects, Experience, Education,
│   │   │                Achievements, Research, Certifications, Contact
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json   (root — runs both with concurrently)
├── vercel.json
└── README.md
`

## Getting Started (Local)

1. **Install dependencies**
   `ash
   npm install
   npm --prefix backend install
   npm --prefix frontend install
   `

2. **Configure environment**
   - Copy ackend/.env.example to ackend/.env and fill in:
     - MONGODB_URI (your MongoDB Atlas connection string)
     - JWT_SECRET
     - ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME (used to seed your first admin)
     - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
     - CLIENT_URL=http://localhost:5173
   - Copy rontend/.env.example to rontend/.env and set:
     - VITE_API_URL=http://localhost:5000/api

3. **Seed the database (one-time)** — this creates your admin user and populates ALL content from the resume:
   `ash
   node backend/seed/index.js
   `

4. **Run both servers together**
   `ash
   npm run dev
   `
   - Frontend: http://localhost:5173
   - Backend:   http://localhost:5000
   - Admin:     http://localhost:5173/admin  (log in with the ADMIN_EMAIL / ADMIN_PASSWORD you seeded)

## Admin login

After seeding, log in at /admin using the ADMIN_EMAIL and ADMIN_PASSWORD from your .env. The password is hashed with bcrypt before being stored.

## API Reference (REST)

Base URL: /api

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| /auth/register | POST | — | Create admin |
| /auth/login | POST | — | Login, returns JWT |
| /auth/me | GET | JWT | Current admin |
| /profile | GET/PUT | GET: none, PUT: JWT | Profile info |
| /about | GET/PUT | GET: none, PUT: JWT | About info |
| /projects | GET/POST | POST: JWT | List / create |
| /projects/:id | GET/PUT/DELETE | PUT/DELETE: JWT | Single project |
| /projects/reorder | PUT | JWT | Reorder |
| /skills, /experience, /education, /achievements, /research, /certifications | CRUD | — read / JWT write | Same pattern as projects |
| /seo | GET/PUT | GET: none, PUT: JWT | SEO settings |
| /contact | GET | — | Public contact info |
| /messages | POST | — | Submit contact message |
| /messages | GET | JWT | List messages |
| /messages/:id | DELETE | JWT | Delete message |
| /chat | POST | — | AI chatbot reply |
| /upload/image | POST | JWT | Cloudinary image upload → returns URL |
| /upload/resume | POST | JWT | Cloudinary PDF upload → returns URL |

## Deployment (Vercel)

This repo is configured for Vercel with ercel.json:
- Frontend builds to rontend/dist (served as static)
- Backend runs as a serverless function at /api/* and also serves the SPA for client-side routes

### Steps

1. Push the repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Set the **Environment Variables** in Vercel (Project → Settings → Environment Variables):
   - MONGODB_URI
   - JWT_SECRET
   - JWT_EXPIRES_IN=7d
   - ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME (only needed for the first seed run)
   - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
   - CLIENT_URL=https://YOUR-DOMAIN.vercel.app
   - VITE_API_URL=https://YOUR-DOMAIN.vercel.app/api
   - NODE_ENV=production
4. Deploy.
5. (One-time) Seed the database. From a local clone with the same .env, run 
ode backend/seed/index.js. Alternatively, hit POST /api/auth/register once with your admin creds.
6. Log in at https://YOUR-DOMAIN.vercel.app/admin and start editing. Image uploads go straight to Cloudinary.

### Notes about Vercel serverless
- Backend uses express and is exposed as a serverless function. Mongo connections are pooled by Mongoose.
- Long-running seed should be run locally or via a one-off job (Vercel cron / a script) — not on every cold start.

## Tech Stack Summary

- Frontend: React 18, Vite 5, Tailwind CSS 3, Framer Motion, React Router 6, React Helmet Async, React Icons, Axios
- Backend: Node.js, Express, MongoDB Atlas + Mongoose, JWT, bcrypt, Helmet, express-rate-limit, express-validator, Multer, Cloudinary
- Deployment: Vercel (serverless functions + static SPA)

## Content Source

All initial content (name, summary, skills, projects, achievements, education) comes from Aditi Singh's resume and is seeded into MongoDB by ackend/seed/index.js. Everything is editable from the admin dashboard afterwards — no code changes needed.

## License

Personal project for Aditi Singh. © 2026 Aditi Singh. All rights reserved.
