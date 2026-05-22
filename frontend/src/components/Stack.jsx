import { stack } from '../data/content';
import useScrollReveal from '../hooks/useScrollReveal';

const Stack = () => {
  const ref = useScrollReveal();

  return (
    <section id="stack" ref={ref} className="reveal">
      <div className="stack-header">
        <p className="section-tag">Technologies</p>
        <h2 className="section-heading">My Tech Stack</h2>
      </div>

      <div className="stack-grid" role="list">
        {stack.map(({ Icon, name, role, color }, i) => (
          <div
            key={i}
            className="stack-cell"
            role="listitem"
            /* CSS var lets the hover glow use the brand color */
            style={{ '--brand': color }}
          >
            {/* Brand-coloured icon */}
            <div className="stack-icon-wrap" aria-hidden="true">
              <Icon size={38} color={color} />
            </div>

            <div className="stack-cell-name">{name}</div>
            <div className="stack-cell-role">{role}</div>

            {/* Subtle brand-coloured glow that appears on hover */}
            <div className="stack-cell-glow" aria-hidden="true"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
