"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { reviews } from "@/constants/navLinks";


export default function Review() {
  return (
    <motion.div 
      className="mt-20 mb-20 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto overflow-hidden"
      initial={{ y: 120, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative mb-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#28382C] relative z-10">
          What People Say
        </h1>
        <div className="w-48 md:w-64 mt-1">
          <svg viewBox="0 0 318 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9C102.333 4.33333 301 -2 315 9" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="pb-14" // Padding for pagination dots
      >
        {reviews.map((r) => (
          <SwiperSlide key={r.id}>
            <div className="bg-stone-100 shadow-lg rounded-2xl p-6 text-center flex flex-col items-center min-h-80 justify-between">
              <div className="grow flex items-center">
                <p className="text-gray-700 italic leading-relaxed">
                  “{r.review}”
                </p>
              </div>
              
              <div className="mt-6">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-gray-200 mx-auto mb-2"
                />
                <h2 className="font-semibold text-gray-800 text-sm md:text-base">
                  <span className="italic">{r.name}</span>{" "}
                  <br className="sm:hidden" />
                  <span className="text-gray-500 font-normal">from {r.city}</span>
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}