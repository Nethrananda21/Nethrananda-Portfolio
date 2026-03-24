import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  separator = '',
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const maxDecimals = Math.max(
    ...[from, to].map(n => {
      const s = n.toString();
      return s.includes('.') ? s.split('.')[1].length : 0;
    })
  );

  const formatValue = useCallback(
    (latest) => {
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      };
      const formatted = Intl.NumberFormat('en-US', options).format(latest);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(direction === 'down' ? to : from);
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, motionValue, direction, from, to, delay]);

  useEffect(() => {
    const unsub = springValue.on('change', (latest) => {
      if (ref.current) ref.current.textContent = formatValue(latest);
    });
    return () => unsub();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}
