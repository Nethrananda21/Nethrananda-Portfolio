import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  encryptedClassName = '',
  animateOn = 'view',
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (animateOn !== 'view') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsAnimating(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animateOn, hasAnimated]);

  useEffect(() => {
    if (!isAnimating) return;
    let interval;
    let currentIteration = 0;
    const availableChars = characters.split('');

    const shuffleText = (originalText, revealed) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (revealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    };

    interval = setInterval(() => {
      setRevealedIndices(prev => {
        if (sequential) {
          if (prev.size < text.length) {
            const newRevealed = new Set(prev);
            const nextIndex = revealDirection === 'end' ? text.length - 1 - prev.size : prev.size;
            newRevealed.add(nextIndex);
            setDisplayText(shuffleText(text, newRevealed));
            return newRevealed;
          } else {
            clearInterval(interval);
            setIsAnimating(false);
            return prev;
          }
        } else {
          setDisplayText(shuffleText(text, prev));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            setIsAnimating(false);
            setDisplayText(text);
          }
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, characters]);

  return (
    <motion.span
      ref={containerRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText.split('').map((char, i) => (
        <span
          key={i}
          className={revealedIndices.has(i) ? '' : encryptedClassName}
          style={!revealedIndices.has(i) ? { opacity: 0.5 } : {}}
        >
          {char}
        </span>
      ))}
    </motion.span>
  );
}
