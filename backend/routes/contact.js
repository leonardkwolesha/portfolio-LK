const express  = require('express');
const router   = express.Router();
const Contact  = require('../models/Contact');
const { sendContactNotification } = require('../utils/mailer');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/* POST /api/contact */
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  /* ── Validation ── */
  const errors = {};
  if (!name || name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  if (!email || !isValidEmail(email))
    errors.email = 'Please provide a valid email address.';
  if (!message || message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const clean = {
    name:    name.trim(),
    email:   email.trim().toLowerCase(),
    message: message.trim(),
  };

  try {
    /* 1 — Persist to MongoDB */
    await Contact.create(clean);

    /* 2 — Send email notification (non-blocking: a mail failure never
            prevents the visitor from getting a success response) */
    sendContactNotification(clean).catch((err) =>
      console.error('[mailer] notification failed — code:', err.code, '| message:', err.message)
    );

    return res.status(201).json({
      success: true,
      message: 'Message received. Leonard will be in touch soon!',
    });
  } catch (err) {
    console.error('[contact] save error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error — please try again or email directly.',
    });
  }
});

module.exports = router;
