# Leonard Kwolesha — Developer Portfolio

Personal portfolio website for **Leonard Kwolesha**, Full Stack Software Developer & React Native Mobile Developer based in Dar es Salaam, Tanzania.

[![Live Demo](https://img.shields.io/badge/Live-Demo-e8523a?style=for-the-badge)](https://leonardkwolesha.dev)
[![GitHub](https://img.shields.io/badge/GitHub-leonardkwolesha-181717?style=for-the-badge&logo=github)](https://github.com/leonardkwolesha)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, CSS Variables |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Email | Nodemailer + Gmail SMTP |
| Fonts | Poppins (Google Fonts) |
| Icons | react-icons (Feather, Simple Icons, Material) |

---

## Features

- ⚡ **Scroll reveal animations** — sections fade in as you scroll
- 🔴 **Dark + red accent design system** — consistent CSS variables throughout
- 🖊️ **Typing animation** — cycles through developer titles in the hero
- 📬 **Working contact form** — saves to MongoDB + emails notification to inbox
- ✅ **Real-time field validation** — per-field check/error icons as you type
- 🔔 **Success toast** — animated popup auto-dismisses after 2 seconds
- 📱 **Fully responsive** — desktop, tablet, and mobile layouts

---

## Project Structure

```
portfolio-leonard/
├── frontend/                  # React + Vite app
│   ├── public/
│   │   ├── ceo_nobg.png       # Hero photo
│   │   └── leonard_nobg.png   # About photo
│   ├── src/
│   │   ├── components/        # Navbar, Hero, About, Projects, Stack, Contact, Footer
│   │   ├── data/
│   │   │   └── content.js     # Single source of truth for all content
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js
│   │   ├── App.jsx
│   │   └── index.css
│   └── vite.config.js
│
├── backend/                   # Node.js + Express API
│   ├── models/
│   │   └── Contact.js         # Mongoose schema
│   ├── routes/
│   │   └── contact.js         # POST /api/contact
│   ├── utils/
│   │   └── mailer.js          # Nodemailer Gmail transporter
│   ├── index.js               # Express entry + MongoDB connection
│   └── .env.example           # Environment variable template
│
└── vercel.json                # Deployment config
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/leonardkwolesha/portfolio-LK.git
cd portfolio-LK
```

### 2. Install dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 3. Configure environment variables

```bash
cp backend/.env.example backend/.env
```

Fill in `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio-LK?appName=Cluster0
PORT=5000
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx   # Gmail App Password
```

> **Gmail App Password:** Google Account → Security → 2-Step Verification → App passwords

### 4. Run locally

```bash
# From root — starts both servers together
npm run dev

# Or separately:
cd frontend && npm run dev   # http://localhost:5173
cd backend  && npm run dev   # http://localhost:5000
```

---

## Deployment (Vercel)

| Setting | Value |
|---|---|
| Framework | Vite (React) |
| Build Command | `cd frontend && npm install && npm run build` |
| Output Directory | `frontend/dist` |
| API Rewrites | `/api/:path*` → `/backend/index.js` |

Set these in the Vercel dashboard under **Environment Variables**:
- `MONGODB_URI`
- `EMAIL_USER`
- `EMAIL_PASS`

---

## Featured Projects

| Project | Stack | Links |
|---|---|---|
| **Kebite** — Food delivery platform | React, React Native, Node.js, MongoDB, Socket.io | [GitHub](https://github.com/leonardkwolesha/kebite) |
| **Rent Easy** — Rental property management | React, React Native, Node.js, MongoDB, Express | [GitHub](https://github.com/leonardkwolesha/rent-easy) |
| **BloggerLK** — Full-stack blogging platform | React, Node.js, MongoDB, Express, Cloudinary | [GitHub](https://github.com/leonardkwolesha/blog-project) · [Live](https://blog-project-seven-alpha.vercel.app/) |
| **EduAI OS** — AI-powered learning platform | Next.js, FastAPI, Python, OpenAI, Supabase | [GitHub](https://github.com/leonardkwolesha/e-learning) |

---

## Contact

**Leonard Kwolesha**  
📧 [leonardsengoma07@gmail.com](mailto:leonardsengoma07@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/leonard-sengoma-39a337351/)  
🐙 [GitHub](https://github.com/leonardkwolesha/portfolio-LK)

---

*Built with React + Node.js · Dark theme · Red accent · Dar es Salaam, Tanzania*
