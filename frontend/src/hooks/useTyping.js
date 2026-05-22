import { useState, useEffect } from 'react';

/**
 * Cycles through an array of words with a typewriter effect.
 * Returns the current display string — append a blinking cursor in JSX.
 */
const useTyping = (words, typingSpeed = 75, deletingSpeed = 45, pauseMs = 1800) => {
  const [text,      setText]      = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase,     setPhase]     = useState('typing'); // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    const current = words[wordIndex];

    if (phase === 'typing') {
      if (text === current) {
        const t = setTimeout(() => setPhase('deleting'), pauseMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typingSpeed
      );
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (text === '') {
        setWordIndex((wordIndex + 1) % words.length);
        setPhase('typing');
        return;
      }
      const t = setTimeout(
        () => setText(text.slice(0, -1)),
        deletingSpeed
      );
      return () => clearTimeout(t);
    }
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
};

export default useTyping;
