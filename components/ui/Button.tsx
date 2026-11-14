'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
}

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button'
}: ButtonProps) => {
  const baseClasses = "relative px-8 py-4 font-body font-medium tracking-wide transition-all duration-500 overflow-hidden group";
  
  const variantClasses = {
    primary: "bg-shadow/60 border border-candlelight/30 text-candlelight hover:border-candlelight hover:shadow-glow-gold",
    secondary: "bg-void/50 border border-ghost-blue/30 text-ghost-blue hover:text-parchment hover:border-ghost-blue",
    ghost: "bg-transparent border border-ash/20 text-ash hover:text-parchment hover:border-candlelight/40",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-candlelight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Elegant shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-candlelight/10 to-transparent"
        initial={{ x: '-200%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 1 }}
      />
    </motion.button>
  );
};
