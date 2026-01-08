import React from 'react';

import CourseCard from '../ui/CourseCard';

const Courses = () => {
  const lightBg = "bg-gray-50";
  
  const courses = [
    { title: "Advanced Excel & MIS", duration: "4 Weeks", level: "Beginner to Pro", price: "$99" },
    { title: "Full Stack Web Dev", duration: "12 Weeks", level: "Career Path", price: "$299" },
    { title: "Python for Data Science", duration: "8 Weeks", level: "Intermediate", price: "$149" },
  ];

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