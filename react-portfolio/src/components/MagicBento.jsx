import { useRef, useCallback } from 'react';
import './MagicBento.css';

export function MagicBento({ children, className = '' }) {
  return <div className={`magic-bento-grid ${className}`}>{children}</div>;
}

export function MagicBentoCard({ children, className = '' }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="magic-bento-card-content">{children}</div>
    </div>
  );
}

export default MagicBento;
