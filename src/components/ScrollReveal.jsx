import React from 'react';
import { motion } from 'framer-motion';

export function ScrollRevealContainer({ 
  children, 
  className = "", 
  stagger = 0.06,
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
      viewport={{ once: true, margin: "0px" }}
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
  const yOffset = direction === "up" ? 14 : direction === "down" ? -14 : 0;
  const xOffset = direction === "left" ? 14 : direction === "right" ? -14 : 0;

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: yOffset, 
      x: xOffset
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut"
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
  const yOffset = direction === "up" ? 16 : direction === "down" ? -16 : 0;
  const xOffset = direction === "left" ? 16 : direction === "right" ? -16 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.38, delay, ease: "easeOut" }}
      className={`stagger-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
