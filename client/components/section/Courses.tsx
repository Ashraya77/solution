"use client";

import React from 'react';
import { motion } from "framer-motion";
import CourseCard from '../ui/CourseCard';
import { courses } from '@/constants/navLinks';

const Courses = () => {
  const lightBg = "bg-gray-50";

  // 1. Container variants to handle the "one by one" logic
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Lower number = faster sequence
        staggerChildren: 0.1, 
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className={`${lightBg} py-16 px-6 relative z-0`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Animated Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-yellow-400 mb-12"
        >
          Expert-Led <span className="text-sky-600">Computer Courses</span>
        </motion.h2>

        {/* 2. Wrap the grid in a motion.div using the container variants */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Starts when 10% of the grid is visible
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;