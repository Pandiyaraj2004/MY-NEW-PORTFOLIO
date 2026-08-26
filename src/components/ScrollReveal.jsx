import React from 'react';
import { motion } from 'framer-motion';

export function ScrollRevealContainer({ 
  children, 
  className = "", 
  stagger = 0.12,
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
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ 
  children, 
  className = "", 
  direction = "up",
  delay = 0
}) {
  const yOffset = direction === "up" ? 35 : direction === "down" ? -35 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: yOffset, 
      x: xOffset,
      scale: 0.95
    },
    visible: {
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1]
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

/**
 * StoryStep: Deliberate, scroll-driven storytelling scene component.
 * Triggers strictly when the user scrolls the item into the center-focal viewport zone.
 */
export function StoryStep({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up"
}) {
  const yOffset = direction === "up" ? 45 : direction === "down" ? -45 : 0;
  const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -15% 0px" }}
      transition={{ 
        duration: 0.75, 
        delay, 
        ease: [0.19, 1, 0.22, 1] // Smooth cinematic ease-out
      }}
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
  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`stagger-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
