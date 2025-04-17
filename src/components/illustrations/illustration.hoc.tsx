'use client';

import type React from 'react';

// eslint-disable-next-line no-duplicate-imports
import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimatedIllustrationProps {
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}

export function WithAnimatedIllustration({
  title,
  description,
  children,
  delay = 0,
}: AnimatedIllustrationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      data-illustration="true"
      className="group relative overflow-hidden rounded-xl border bg-background p-2 transition-all hover:shadow-lg"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br from-muted/50 to-muted">
        <div className="size-full p-6 transition-transform duration-500 group-hover:scale-105">
          {children}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
