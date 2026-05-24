'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Code, Briefcase, Award, ArrowUpRight } from 'lucide-react';

const TrainingFeatures = () => {
  const features = [
    { 
      title: "1:1 Mentorship", 
      desc: "Get personalized attention from industry experts.", 
      icon: <UserCheck className="text-primary" size={24} />,
      size: "col-span-1"
    },
    { 
      title: "Hands-on Projects", 
      desc: "Build real-world apps and systems during training.", 
      icon: <Code className="text-primary" size={24} />,
      size: "col-span-1"
    },
    { 
      title: "Job Placement", 
      desc: "Resume building and interview prep with our partner firms.", 
      icon: <Briefcase className="text-primary" size={24} />,
      size: "col-span-2"
    }
  ];

  return (
    <section className="py-14 px-6 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content Side */}
        <div className="lg:w-5/12">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-primary uppercase bg-soft-purple rounded-full">
            Our Advantage
          </div>
          <h2 className="text-5xl font-black text-foreground mb-6 leading-[1.1]">
            Why Train With <br/>
            <span className="relative inline-block text-primary">
              Solution Computer
              <svg className="absolute -bottom-2 left-0 w-full text-accent" viewBox="0 0 318 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9C102.333 4.33333 301 -2 315 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          
          <p className="text-muted mb-10 text-xl leading-relaxed">
            We bridge the gap between academic theory and industry demand with high-performance hardware and elite mentors.
          </p>

          {/* Premium Statistics Card */}
          <div className="relative group p-1 rounded-3xl bg-linear-to-br from-primary to-primary-dark shadow-2xl overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="bg-background/95 backdrop-blur-sm p-8 rounded-[1.4rem]">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-black text-primary tracking-tighter">90%</span>
                <div className="h-8 w-px bg-border-subtle"></div>
                <p className="text-sm font-bold text-muted uppercase tracking-wide">Success Rate</p>
              </div>
              <p className="text-muted font-medium">
                Our graduates land roles within <span className="text-primary font-bold">90 days</span> of completion.
              </p>
            </div>
          </div>
        </div>
        
        <motion.div
          className="lg:w-7/12 grid grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.42,
              },
            },
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i} 
              className={`${f.size} group relative p-8 bg-background border border-border-subtle rounded-4xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300`}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
            >
              <div className="mb-6 w-14 h-14 rounded-2xl bg-soft-purple flex items-center justify-center transition-colors duration-300">
                {f.icon}
              </div>
              
              <h4 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                {f.title}
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </h4>
              <p className="text-muted leading-relaxed italic">{f.desc}</p>
              
              {/* Subtle Decorative Number */}
              <span className="absolute bottom-6 right-8 text-5xl font-black text-soft-purple opacity-[0.35] group-hover:opacity-[0.55] transition-opacity">
                0{i + 1}
              </span>
            </motion.div>
          ))}
          
          <motion.div
            className="col-span-2 mt-2 flex items-center justify-between p-6 bg-foreground rounded-3xl text-background"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut' },
              },
            }}
          >
            <div className="flex items-center gap-4">
               <div className="p-3 bg-background/10 rounded-xl">
                 <Award className="text-accent" />
               </div>
               <span className="font-bold tracking-wide">CAN Certificates</span>
            </div>
            <button className="px-6 py-2 bg-primary hover:bg-primary-dark rounded-full text-sm font-black transition-colors">
              VIEW SAMPLE
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingFeatures;
