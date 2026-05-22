require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const contactRoute        = require('./routes/contact');
const { verifyMailer }    = require('./utils/mailer');

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
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
