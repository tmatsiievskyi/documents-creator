'use client';

import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';

export function TemplatesIllustration() {
  return (
    <div className="relative size-full">
      {/* Background grid */}
      <motion.div
        className="absolute inset-0 grid grid-cols-2 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Template cards */}
        {[
          { color: 'bg-blue-100 dark:bg-blue-900/20', delay: 0.2 },
          { color: 'bg-green-100 dark:bg-green-900/20', delay: 0.3 },
          { color: 'bg-amber-100 dark:bg-amber-900/20', delay: 0.4 },
          { color: 'bg-purple-100 dark:bg-purple-900/20', delay: 0.5 },
        ].map((template, i) => (
          <motion.div
            key={i}
            className={`rounded-lg ${template.color} shadow-sm`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: template.delay,
              duration: 0.4,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <div className="p-3">
              <div className="bg-foreground/10 mb-2 h-2 w-16 rounded-full"></div>
              <div className="bg-foreground/10 mb-1.5 h-1.5 w-full rounded-full"></div>
              <div className="bg-foreground/10 mb-1.5 h-1.5 w-3/4 rounded-full"></div>
              <div className="bg-foreground/10 h-1.5 w-5/6 rounded-full"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating template */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-24 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-xl dark:bg-slate-800"
        initial={{ y: -20, opacity: 0, rotateZ: -5 }}
        animate={{ y: 0, opacity: 1, rotateZ: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.5,
          type: 'spring',
        }}
      >
        <div className="p-2">
          <div className="bg-primary/20 mb-2 h-2 w-12 rounded-full"></div>
          <div className="bg-foreground/10 mb-1 h-1 w-full rounded-full"></div>
          <div className="bg-foreground/10 mb-1 h-1 w-3/4 rounded-full"></div>
          <div className="bg-foreground/10 mb-1 h-1 w-5/6 rounded-full"></div>
          <div className="bg-foreground/10 mb-1 h-1 w-2/3 rounded-full"></div>
          <div className="bg-muted h-6 w-full rounded"></div>
        </div>

        <motion.div
          className="bg-primary absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full text-white shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <Copy className="size-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}
