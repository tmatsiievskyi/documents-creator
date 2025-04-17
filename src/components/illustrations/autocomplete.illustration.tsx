'use client';

import { motion } from 'framer-motion';
import { Command, Sparkles } from 'lucide-react';

export function AutocompleteIllustration() {
  return (
    <div className="relative size-full">
      {/* Document background */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white shadow-md dark:bg-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Document content */}
      <div className="absolute inset-x-4 top-6">
        {/* Paragraph lines */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="mb-3 h-2 rounded bg-slate-200 dark:bg-slate-700"
            initial={{ width: `${70 + 0.1 * i * 25}%` }}
            animate={{ width: `${70 + 0.5 * i * 25}%` }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              repeatDelay: 1,
            }}
          />
        ))}
      </div>

      {/* Typing cursor and text */}
      <div className="absolute left-4 top-24">
        <div className="flex items-center">
          <motion.div
            className="h-5 w-20 rounded bg-slate-200 dark:bg-slate-700"
            animate={{ width: [20, 60, 100, 140] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
              repeatDelay: 1,
            }}
          />
          <motion.div
            className="ml-1 h-5 w-0.5 bg-primary"
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
            }}
          />
        </div>
      </div>

      {/* Autocomplete popup */}
      <motion.div
        className="absolute left-4 top-32 w-64 rounded-lg border bg-background p-2 shadow-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [-10, 0, 0, -10],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
          times: [0, 0.1, 0.9, 1],
        }}
      >
        <div className="flex items-center gap-2 rounded-md bg-muted p-2 text-sm font-medium text-primary">
          <Command className="size-4" />
          <span>Suggested variable</span>
          <Sparkles className="ml-auto size-3" />
        </div>

        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="mt-2 flex items-center gap-2 rounded-md p-2 text-sm hover:bg-muted"
            whileHover={{ backgroundColor: 'rgba(var(--muted), 0.5)' }}
          >
            <div className="size-3 rounded-full bg-slate-300 dark:bg-slate-600" />
            <div className="h-2 w-32 rounded bg-slate-200 dark:bg-slate-700" />
          </motion.div>
        ))}
      </motion.div>

      {/* Variable highlights */}
      {[
        { left: '20%', top: '15%', width: '15%', delay: 1 },
        { left: '60%', top: '15%', width: '25%', delay: 2 },
        { left: '30%', top: '25%', width: '20%', delay: 3 },
      ].map((highlight, i) => (
        <motion.div
          key={i}
          className="absolute h-2 rounded bg-primary/20"
          style={{
            left: highlight.left,
            top: highlight.top,
            width: highlight.width,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            backgroundColor: [
              'rgba(var(--primary), 0.2)',
              'rgba(var(--primary), 0.4)',
              'rgba(var(--primary), 0.2)',
            ],
          }}
          transition={{
            duration: 2,
            delay: highlight.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  );
}
