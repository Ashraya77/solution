'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../ui/CourseCard';
import { courses } from '@/constants/navLinks';

const Courses = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section className="bg-soft-purple py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Courses We Offer
          </p>

          <h2 className="text-3xl md:text-4xl font-black leading-tight text-foreground">
            Learn practical computer skills with us
          </h2>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
            At Solution Computer, we provide beginner-friendly and career-focused
            computer courses for students, job seekers, and working professionals.
          </p>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
            >
              <CourseCard {...course} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;