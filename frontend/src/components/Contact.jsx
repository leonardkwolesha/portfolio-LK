import { useState } from 'react';
import {
  FiSend, FiMail, FiGithub, FiLinkedin,
  FiCheck, FiAlertCircle, FiCheckCircle,
  FiMapPin, FiClock,
} from 'react-icons/fi';
import { personal } from '../data/content';
import useScrollReveal from '../hooks/useScrollReveal';

/* ── Validation (unchanged) ── */
const validate = ({ name, email, message }) => {
  const errors = {};
  if (!name.trim() || name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.';
  if (!message.trim() || message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  return errors;
};

const INITIAL = { name: '', email: '', message: '' };

const Contact = () => {
  const ref = useScrollReveal();
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error

  /* ── Handlers (all unchanged) ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim().toLowerCase(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.errors) { setErrors(data.errors); setStatus('idle'); return; }
        throw new Error(data.message || 'Server error');
      }
      setStatus('success');
      setForm(INITIAL);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const charLeft = 2000 - form.message.length;

  /* ── Per-field helpers (unchanged) ── */
  const isOk  = (f) => touched[f] && !errors[f] && form[f].trim().length > 0;
  const isBad = (f) => touched[f] && !!errors[f];
  const inputClass = (f) =>
    [errors[f] ? 'input-error' : '', isOk(f) ? 'input-valid' : '']
      .filter(Boolean).join(' ');

  return (
    <section id="contact" ref={ref} className="reveal">

      {/* Decorative background blobs */}
      <div className="contact-blob contact-blob--1" aria-hidden="true" />
      <div className="contact-blob contact-blob--2" aria-hidden="true" />

      <div className="contact-grid">

        {/* ════════════════════════════
            Left — info + socials
        ════════════════════════════ */}
        <div className="contact-left">
          <p className="section-tag">Let&apos;s work together</p>
          <h2 className="section-heading">Got a project?</h2>
          <p className="contact-desc">
            Whether you need a web platform, a mobile app, or a full backend
            API — I&apos;m open to new opportunities and collaborations.
          </p>

          <div className="contact-info-list">
            {/* Email */}
            <div className="contact-info-item">
              <span className="contact-info-icon"><FiMail size={16} /></span>
              <div>
                <p className="contact-info-label">Email</p>
                <a
                  href={`mailto:${personal.email}`}
                  className="contact-info-value contact-info-link"
                >
                  {personal.email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="contact-info-item">
              <span className="contact-info-icon"><FiMapPin size={16} /></span>
              <div>
                <p className="contact-info-label">Location</p>
                <p className="contact-info-value">Dar es Salaam, Tanzania</p>
              </div>
            </div>

            {/* Response time */}
            <div className="contact-info-item">
              <span className="contact-info-icon"><FiClock size={16} /></span>
              <div>
                <p className="contact-info-label">Response time</p>
                <p className="contact-info-value">Within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="socials">
            <a href={personal.github}   className="soc" target="_blank" rel="noopener noreferrer">
              <FiGithub size={16} /> GitHub
            </a>
            <a href={personal.linkedin} className="soc" target="_blank" rel="noopener noreferrer">
              <FiLinkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>

        {/* ════════════════════════════
            Right — glassmorphism card
        ════════════════════════════ */}
        <div className="contact-card">
          <h3 className="contact-card-title">Send a Message</h3>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            <div className="form-row">

              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="cf-name">Your Name</label>
                <div className="input-wrap">
                  <input
                    id="cf-name"
                    type="text"
                    name="name"
                    placeholder="e.g. Mon Leo"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass('name')}
                    aria-label="Your name"
                    aria-invalid={!!errors.name}
                    maxLength={100}
                  />
                  {touched.name && (
                    <span className={`input-status-icon ${isOk('name') ? 'input-status-icon--ok' : 'input-status-icon--err'}`}>
                      {isOk('name') ? <FiCheck size={13} /> : <FiAlertCircle size={13} />}
                    </span>
                  )}
                </div>
                {isBad('name') && (
                  <span className="field-error" role="alert">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="cf-email">Your Email</label>
                <div className="input-wrap">
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    placeholder="e.g. monleo@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass('email')}
                    aria-label="Your email"
                    aria-invalid={!!errors.email}
                  />
                  {touched.email && (
                    <span className={`input-status-icon ${isOk('email') ? 'input-status-icon--ok' : 'input-status-icon--err'}`}>
                      {isOk('email') ? <FiCheck size={13} /> : <FiAlertCircle size={13} />}
                    </span>
                  )}
                </div>
                {isBad('email') && (
                  <span className="field-error" role="alert">{errors.email}</span>
                )}
              </div>

            </div>

            {/* Message */}
            <div className="form-group">
              <label className="form-label" htmlFor="cf-message">Your Message</label>
              <textarea
                id="cf-message"
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('message')}
                aria-label="Your message"
                aria-invalid={!!errors.message}
                maxLength={2000}
              />
              <div className="textarea-footer">
                {isBad('message')
                  ? <span className="field-error" role="alert">{errors.message}</span>
                  : <span />
                }
                <span className={`char-count${charLeft < 100 ? ' char-count--warn' : ''}`}>
                  {charLeft}
                </span>
              </div>
            </div>

            {/* Inline error banner */}
            {status === 'error' && (
              <div className="form-feedback feedback-error" role="alert">
                <FiAlertCircle size={18} className="feedback-icon" />
                <div>
                  <strong>Something went wrong.</strong>
                  {' '}Please try again or{' '}
                  <a href={`mailto:${personal.email}`}>email me directly</a>.
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-red form-submit"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading'
                ? <><span className="btn-spinner" />Sending…</>
                : <><FiSend size={15} />Send Message</>
              }
            </button>
          </form>
        </div>

      </div>

      {/* ── Success toast — fixed, auto-dismisses after ~2s ── */}
      {status === 'success' && (
        <div
          className="toast-popup"
          role="status"
          aria-live="polite"
          onAnimationEnd={() => setStatus('idle')}
        >
          <span className="toast-icon"><FiCheckCircle size={22} /></span>
          <div className="toast-text">
            <strong>Message sent!</strong>
            <span>I&apos;ll get back to you soon.</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
