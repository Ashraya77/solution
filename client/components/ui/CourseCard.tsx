"use client";

import React from 'react';
import { Timer, TrendingUp, ChevronRight } from 'lucide-react';
import { motion, type Variants } from "framer-motion"; // Changed from motion/react for standard compatibility
import Link from 'next/link';

type CourseCardtypes = {
  title: string;
  duration: string;
  level: string;
  price: string;
}

// 1. Define the animation variants for the individual card
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const CourseCard = ({ title, duration, level, price }: CourseCardtypes) => {
  return (
    <motion.div 
      variants={cardVariants}
      // Layout ensures smooth movement if the grid changes
      layout
      className="group relative w-full max-w-sm p-px rounded-3xl bg-linear-to-b from-border-subtle to-transparent hover:from-primary transition-all duration-500"
    >
      <div className="relative bg-background p-6 rounded-[23px] overflow-hidden h-full">
        
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={80} strokeWidth={1} />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-soft-purple rounded-lg text-[10px] uppercase tracking-widest font-black text-muted group-hover:bg-accent-soft group-hover:text-primary transition-colors"
            >
              {level}
            </motion.div>
            <div className="text-xl font-black text-foreground italic tracking-tighter">
              {price}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-foreground leading-[1.1] mb-4 tracking-tight">
            {title}
          </h3>

          <div className="flex gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-soft-purple rounded-md text-primary">
                <Timer size={14} />
              </div>
              <span className="text-xs font-semibold text-muted uppercase">{duration}</span>
            </div>
          </div>

          <Link href="/enroll" className="w-full py-4 bg-foreground text-background rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-primary transition-all active:scale-[0.98]">
            Start Learning
            <ChevronRight size={18} className="opacity-50 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
