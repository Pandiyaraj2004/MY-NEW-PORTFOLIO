import React from 'react';
import { motion } from 'framer-motion';

export function ScrollRevealContainer({ 
  children, 
  className = "", 
  stagger = 0.09,
  delay = 0 
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ 
  children, 
  className = "",
  direction = "up"
}) {
  const yOffset = direction === "up" ? 22 : direction === "down" ? -22 : 0;
  const xOffset = direction === "left" ? 22 : direction === "right" ? -22 : 0;

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: yOffset, 
      x: xOffset,
      scale: 0.97
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.42,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`stagger-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up"
}) {
  const yOffset = direction === "up" ? 24 : direction === "down" ? -24 : 0;
  const xOffset = direction === "left" ? 24 : direction === "right" ? -24 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`stagger-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
