require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const contactRoute        = require('./routes/contact');
const { verifyMailer }    = require('./utils/mailer');

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── CORS — allow localhost (dev), Vercel preview + production URLs ── */
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,               // set on Render: https://portfolio-lk-six.vercel.app
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server (no Origin) or Vercel proxy + known origins
    if (!origin || ALLOWED_ORIGINS.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '10kb' }));

/* ── Routes ── */
app.use('/api/contact', contactRoute);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── 404 handler ── */
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

/* ── Global error handler ── */
app.use((err, _req, res, _next) => {
  console.error('[server] unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

/* ── Connect to MongoDB then start server ── */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      verifyMailer(); // logs ✅ or ❌ with the exact SMTP error
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
