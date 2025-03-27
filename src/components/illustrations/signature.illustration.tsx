// signature.illustration.tsx - optimized
'use client';

import { motion } from 'framer-motion';
import { Pen } from 'lucide-react';

export function SignatureIllustration() {
  return (
    <div className="relative size-full">
      {/* Document background with will-change */}
      <motion.div
        className="will-change-opacity absolute inset-0 rounded-lg bg-white shadow-md dark:bg-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Document content - simplified */}
      <div className="absolute inset-x-4 top-4">
        {/* Text lines with reduced animations */}
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="mb-2 h-1.5 rounded bg-slate-200 opacity-90 dark:bg-slate-700"
            style={{
              width: `${85 - i * 5}%`,
              opacity: 1,
              transition: `opacity 0.3s ease ${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Signature area */}
      <div
        className="absolute inset-x-4 bottom-12 h-20 rounded-md border-2 border-dashed border-slate-300 dark:border-slate-600"
        style={{
          opacity: 1,
          transition: 'opacity 0.3s ease 0.6s',
        }}
      >
        <motion.div
          className="text-muted-foreground will-change-opacity absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm"
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        >
          Sign here
        </motion.div>

        {/* Signature path - simplified animation */}
        <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 300 80">
          <motion.path
            d="M50,40 C70,20 90,60 110,40 C130,20 150,60 170,40 C190,20 210,60 230,40"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary will-change-transform"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
              ease: 'easeOut',
              repeatType: 'loop',
            }}
          />
        </svg>
      </div>

      {/* Pen cursor - simplified animation */}
      <motion.div
        className="absolute will-change-transform"
        animate={{
          x: [20, 80, 120, 200],
          y: [100, 100, 100, 100],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          delay: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3,
          ease: 'easeInOut',
          times: [0, 0.1, 0.9, 1],
        }}
      >
        <div className="relative">
          <Pen className="text-primary size-6" />
        </div>
      </motion.div>

      {/* Signature complete checkmark - simplified */}
      <motion.div
        className="absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-full bg-green-500 text-white will-change-transform"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 0, 1, 1, 0] }}
        transition={{
          duration: 1.5,
          delay: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3.5,
          times: [0, 0.6, 0.7, 0.9, 1],
          ease: 'easeInOut',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3334 4L6.00008 11.3333L2.66675 8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
