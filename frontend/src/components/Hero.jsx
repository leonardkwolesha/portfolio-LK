import { personal } from '../data/content';
import useTyping from '../hooks/useTyping';

const Hero = () => {
  /* Cycles: "Full Stack Developer" → "React Native Developer" → … */
  const typedTitle = useTyping(personal.titles, 75, 45, 1800);

  return (
    <section id="home">
      {/* ── Left: text ── */}
      <div className="hero-left">
        <div className="hello-line">
          Hello<span className="hello-dot" aria-hidden="true"></span>
        </div>

        <div className="im-line">
          <span className="im-bar" aria-hidden="true"></span>
          I&apos;m Leonard
        </div>

        {/* Typing animation: cycles through roles */}
        <div className="dev-title" aria-live="polite">
          {typedTitle}
          <span className="typing-cursor" aria-hidden="true">|</span>
        </div>

        <p className="hero-sub">{personal.subtitle}</p>

        <div className="hero-btns">
          <a href="#contact"  className="btn-red">Got a project?</a>
          <a href="#projects" className="btn-ghost">My work</a>
        </div>

        <div className="avail-badge">
          <span className="avail-dot" aria-hidden="true"></span>
          Open to opportunities
        </div>
      </div>

      {/* ── Right: circular photo ── */}
      <div className="hero-right">
        <div className="photo-wrap">
          <div className="photo-glow"       aria-hidden="true"></div>
          <div className="photo-ring-outer" aria-hidden="true"></div>
          <div className="photo-ring"       aria-hidden="true"></div>

          <div className="photo-circle">
            <img
              src={personal.photo}
              alt="Leonard Kwolesha — Full Stack Developer"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          <div className="bracket-left"  aria-hidden="true">&lt;</div>
          <div className="bracket-right" aria-hidden="true">&gt;</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
