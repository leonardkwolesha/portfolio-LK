import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

/**
 * Floating button that appears after scrolling 400 px.
 * Smooth-scrolls back to the top on click.
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={scrollTop}
      aria-label="Back to top"
    >
      <FiArrowUp size={18} />
    </button>
  );
};

export default BackToTop;
