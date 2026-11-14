'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'ornate';
}

export const Card = ({ children, className = '', variant = 'default' }: CardProps) => {
  return (
    <motion.div
      className={`relative bg-shadow/40 backdrop-blur-sm border border-candlelight/15 p-8 group ${className}`}
      whileHover={{ 
        scale: variant === 'ornate' ? 1.01 : 1.02,
        borderColor: 'rgba(201, 168, 108, 0.4)',
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Victorian corner ornaments for ornate variant */}
      {variant === 'ornate' && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
        </>
      )}
      
      {/* Subtle hover glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-candlelight/0 via-candlelight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
