import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollFloat({
  children,
  className = '',
  as: Tag = 'h2',
  distance = 60,
  duration = 0.8,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance, filter: 'blur(12px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration, ease: 'easeOut' }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}
