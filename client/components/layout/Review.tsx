"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {motion} from "framer-motion"

const reviews = [
  { id: 1, name: "Aarav Sharma", city: "Pokhara", review: "The trip was well-organized, and I loved how friendly everyone was. Definitely coming back!", img: "/1.jpg" },
  { id: 2, name: "Sofia Martinez", city: "Kathmandu", review: "Beautiful views and unforgettable experiences. I enjoyed every single moment.", img: "/2.jpg" },
  { id: 3, name: "Liam Johnson", city: "Chitwan", review: "A perfect blend of adventure and relaxation. Highly recommend to travelers of all ages.", img: "/3.jpg" },
  { id: 4, name: "Maya Thapa", city: "Bhaktapur", review: "The cultural richness of this place was amazing. I felt so connected to the local traditions.", img: "/4.jpg" },
  { id: 5, name: "Ethan Wilson", city: "Butwal", review: "Everything from food to transport was smooth. Super impressed with the planning.", img: "/5.jpg" },
  { id: 6, name: "Isabella Rossi", city: "Dharan", review: "The people here made me feel so welcome. It’s one of the best trips I’ve ever had.", img: "/6.jpg" },
  { id: 7, name: "Noah Kim", city: "Lalitpur", review: "Amazing service, comfortable stay, and wonderful memories. Couldn’t ask for more!", img: "/7.jpg" },
  { id: 8, name: "Aanya Patel", city: "Janakpur", review: "Traveling here was a dream come true. The landscapes were absolutely stunning.", img: "/8.jpg" },
  { id: 9, name: "Oliver Brown", city: "Biratnagar", review: "I was impressed with the attention to detail. Every day felt like a new adventure.", img: "/9.jpg" },
  { id: 10, name: "Hana Suzuki", city: "Hetauda", review: "Such a refreshing experience! I met wonderful people and enjoyed every bit of it.", img: "/10.jpg" },
];

export default function Review() {
  return (
    <motion.div className="mt-20 mb-20 mx-60" style={{ paddingLeft: 60, paddingRight: 60 }}
    initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-bold text-center text-[#28382C] mb-4 ">What People Say</h1>
       <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 318 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9C102.333 4.33333 301 -2 315 9" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round"/>
              </svg>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((r) => (
          <SwiperSlide key={r.id}>
            <div className="bg-stone-100 shadow-lg rounded-2xl p-6 text-center flex flex-col items-center h-80 w-100">
              <p className="text-gray-700 italic mb-4 leading-relaxed h-20">“{r.review}”</p>
              <img
                src={r.img}
                alt={r.name}
                className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-gray-200 mb-2 mt-5"
              />
              <h2 className="font-semibold text-gray-800">
                <span className="italic">{r.name}</span>{" "}
                <span className="text-gray-500">from {r.city}</span>
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}