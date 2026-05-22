import { ticker } from '../data/content';

const TechTicker = () => {
  /* Duplicate once for a seamless infinite loop */
  const items = [...ticker, ...ticker];

  return (
    <div className="tech-ticker" aria-label="Technology skills ticker">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" aria-hidden="true"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;
