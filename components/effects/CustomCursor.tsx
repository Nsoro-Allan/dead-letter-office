'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.onclick !== null ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
      
      setIsPointer(isClickable);
    };

    if (isDesktop) {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', updateCursorType);
    }

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateCursorType);
    };
  }, [isDesktop]);

  // Don't render on mobile/touch devices
  if (!isDesktop) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed w-3 h-3 rounded-full bg-lavender pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-lavender/50 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
      />

      {/* Trailing glow */}
      <motion.div
        className="fixed w-20 h-20 rounded-full bg-purple/20 blur-xl pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 1,
        }}
      />
    </>
  );
};
