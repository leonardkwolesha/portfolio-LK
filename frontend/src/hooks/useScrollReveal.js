import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a DOM element.
 * Adds the class "revealed" once the element enters the viewport.
 * Pair with the .reveal / .revealed CSS classes in index.css.
 */
const useScrollReveal = (threshold = 0.12) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

export default useScrollReveal;
