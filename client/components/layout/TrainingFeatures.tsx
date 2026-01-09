import React from 'react';
import { UserCheck, Code, Briefcase, Award, ArrowUpRight } from 'lucide-react';

const TrainingFeatures = () => {
  const features = [
    { 
      title: "1:1 Mentorship", 
      desc: "Get personalized attention from industry experts.", 
      icon: <UserCheck className="text-sky-600" size={24} />,
      size: "col-span-1"
    },
    { 
      title: "Hands-on Projects", 
      desc: "Build real-world apps and systems during training.", 
      icon: <Code className="text-sky-600" size={24} />,
      size: "col-span-1"
    },
    { 
      title: "Job Placement", 
      desc: "Resume building and interview prep with our partner firms.", 
      icon: <Briefcase className="text-sky-600" size={24} />,
      size: "col-span-2"
    }
  ];

  return (
    <section className="py-14 px-6 bg-[#fcfcfd]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content Side */}
        <div className="lg:w-5/12">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-sky-700 uppercase bg-sky-100 rounded-full">
            Our Advantage
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-6 leading-[1.1]">
            Why Train With <br/>
            <span className="relative inline-block text-sky-600">
              Solution Computer
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 318 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9C102.333 4.33333 301 -2 315 9" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          
          <p className="text-slate-600 mb-10 text-xl leading-relaxed">
            We bridge the gap between academic theory and industry demand with high-performance hardware and elite mentors.
          </p>

          {/* Premium Statistics Card */}
          <div className="relative group p-1 rounded-3xl bg-linear-to-br from-sky-500 to-indigo-600 shadow-2xl overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[1.4rem]">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-black text-sky-600 tracking-tighter">90%</span>
                <div className="h-8 w-px bg-slate-200"></div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Success Rate</p>
              </div>
              <p className="text-slate-700 font-medium">
                Our graduates land roles within <span className="text-sky-600 font-bold">90 days</span> of completion.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:w-7/12 grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`${f.size} group relative p-8 bg-white border border-slate-100 rounded-4xl shadow-sm hover:shadow-xl hover:border-sky-100 transition-all duration-300`}
            >
              <div className="mb-6 w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center  group-hover:text-white transition-colors duration-300">
                {f.icon}
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                {f.title}
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-sky-500" />
              </h4>
              <p className="text-slate-500 leading-relaxed italic">{f.desc}</p>
              
              {/* Subtle Decorative Number */}
              <span className="absolute bottom-6 right-8 text-5xl font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                0{i + 1}
              </span>
            </div>
          ))}
          
          <div className="col-span-2 mt-2 flex items-center justify-between p-6 bg-slate-900 rounded-3xl text-white">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white/10 rounded-xl">
                 <Award className="text-yellow-400" />
               </div>
               <span className="font-bold tracking-wide">CAN Certificates</span>
            </div>
            <button className="px-6 py-2 bg-sky-500 hover:bg-sky-400 rounded-full text-sm font-black transition-colors">
              VIEW SAMPLE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingFeatures;