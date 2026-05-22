import { personal, services, stats } from '../data/content';
import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp      from '../hooks/useCountUp';

/* Isolated counter so each stat gets its own ref + animation */
const StatItem = ({ num, suffix, label }) => {
  const [count, ref] = useCountUp(num, 1800);
  return (
    <div className="stat" ref={ref}>
      <div className="stat-num">
        {count}<sup>{suffix}</sup>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const About = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" ref={sectionRef} className="reveal">

      {/* ── Left: about photo ── */}
      <div className="about-photo-col">
        <div className="about-photo-wrap">
          <img
            src={personal.aboutPhoto}
            alt="Leonard Kwolesha — Full Stack Developer"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      {/* ── Right: text + services + animated stats ── */}
      <div className="about-right">
        <p className="section-tag">Who I am</p>
        <h2 className="section-heading">About me</h2>

        <p className="about-text">{personal.bio1}</p>
        <p className="about-text">{personal.bio2}</p>

        {/* Services — real react-icons, no emojis */}
        <div className="services-list">
          {services.map(({ Icon, name }, i) => (
            <div key={i} className="service-item">
              <div className="service-icon-box" aria-hidden="true">
                <Icon size={20} />
              </div>
              <div className="service-name">{name}</div>
            </div>
          ))}
        </div>

        {/* Animated stat counters */}
        <div className="stats-row">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default About;
