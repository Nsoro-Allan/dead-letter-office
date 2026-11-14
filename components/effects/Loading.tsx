'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative">
            {/* Animated circles */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-32 h-32 rounded-full border-2 border-transparent border-t-lavender border-r-purple" />
            </motion.div>

            <motion.div
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-32 h-32 rounded-full border-2 border-transparent border-b-crimson border-l-blood" />
            </motion.div>

            {/* Center icon */}
            <div className="flex items-center justify-center w-32 h-32">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Moon className="w-12 h-12 text-lavender" />
              </motion.div>
            </div>
          </div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-1/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-serif text-xl text-frost/80 tracking-wider">
              Awakening the spirits...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
