import React from 'react';

import CourseCard from '../ui/CourseCard';
import { courses } from '@/constants/navLinks';

const Courses = () => {
  const lightBg = "bg-gray-50";
  
  

  return (
    <section className={`${lightBg} py-16 px-6`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">Expert-Led <span className="text-sky-600">Computer Courses</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Courses;