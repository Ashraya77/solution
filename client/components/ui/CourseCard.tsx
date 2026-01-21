"use client";

import React from 'react';
import { Timer, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion"; // Changed from motion/react for standard compatibility
import Link from 'next/link';

type CourseCardtypes = {
  title: string;
  duration: string;
  level: string;
  price: string;
}

// 1. Define the animation variants for the individual card
const cardVariants = {
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
      className="group relative w-full max-w-sm p-px rounded-3xl bg-linear-to-b from-slate-200 to-transparent hover:from-sky-400 transition-all duration-500"
    >
      <div className="relative bg-white p-6 rounded-[23px] overflow-hidden h-full">
        
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={80} strokeWidth={1} />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] uppercase tracking-widest font-black text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors"
            >
              {level}
            </motion.div>
            <div className="text-xl font-black text-slate-900 italic tracking-tighter">
              {price}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 leading-[1.1] mb-4 tracking-tight">
            {title}
          </h3>

          <div className="flex gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-sky-50 rounded-md text-sky-600">
                <Timer size={14} />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase">{duration}</span>
            </div>
          </div>

          <Link href="/enroll" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-sky-600 transition-all active:scale-[0.98]">
            Start Learning
            <ChevronRight size={18} className="opacity-50 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;