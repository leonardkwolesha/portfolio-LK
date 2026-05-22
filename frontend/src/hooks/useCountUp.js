import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 → target when the returned ref's element
 * enters the viewport. Fires only once per mount.
 *
 * Usage:
 *   const [count, ref] = useCountUp(100, 1800);
 *   return <span ref={ref}>{count}</span>;
 */
const useCountUp = (target, duration = 1800) => {
  const [count,   setCount]   = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const end         = Number(target);
        const totalFrames = Math.round(duration / 16);
        let   frame       = 0;

        const tick = setInterval(() => {
          frame++;
          /* Ease-out cubic so it decelerates near the end */
          const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
          setCount(Math.round(end * Math.min(progress, 1)));
          if (frame >= totalFrames) {
            setCount(end);
            clearInterval(tick);
          }
        }, 16);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
};

export default useCountUp;
