import { useRef, useCallback } from 'react';

const ClickSpark = ({ children, sparkColor = '#60a5fa', sparkCount = 8, sparkSize = 10, duration = 400 }) => {
  const containerRef = useRef(null);

  const createSpark = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      const angle = (360 / sparkCount) * i;
      const distance = 30 + Math.random() * 40;
      const rad = (angle * Math.PI) / 180;
      const dx = Math.cos(rad) * distance;
      const dy = Math.sin(rad) * distance;
      const size = sparkSize * (0.5 + Math.random() * 0.5);

      Object.assign(spark.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: sparkColor,
        pointerEvents: 'none',
        zIndex: '9999',
        boxShadow: `0 0 6px ${sparkColor}, 0 0 12px ${sparkColor}`,
        transition: `all ${duration}ms ease-out`,
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: '1',
      });

      container.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), duration);
    }
  }, [sparkColor, sparkCount, sparkSize, duration]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }} onClick={createSpark}>
      {children}
    </div>
  );
};

export default ClickSpark;
