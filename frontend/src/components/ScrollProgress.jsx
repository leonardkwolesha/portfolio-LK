import { useState, useEffect } from 'react';

/**
 * Thin red bar pinned to the very top of the page that fills as
 * the user scrolls — layered above the navbar (z-index 300).
 */
const ScrollProgress = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled   = window.scrollY;
      const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
      setPct(maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
};

export default ScrollProgress;
