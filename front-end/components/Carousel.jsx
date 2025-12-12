// src/components/Carousel.jsx

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/src/assets/images/news1.png",
  "/src/assets/images/news2.png",
  "/src/assets/images/news3.png",
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-[1256px] h-[427px] mx-auto mt-6">

      {/* IMAGE WRAPPER */}
      <div className="relative w-full h-[371px]">
        <div className="w-full h-full overflow-hidden rounded-[20px]">
          <img
            src={images[index]}
            alt="carousel"
            className="w-full h-full object-cover block"
            style={{ borderRadius: "20px" }}
          />
        </div>
      </div>

      {/* CHEVRON LEFT */}
      <button
        onClick={prevSlide}
        className="
          absolute
          top-[162px]
          left-[50px]
          z-20
          w-[48px] h-[48px]
          flex items-center justify-center
          bg-white
          rounded-full
          shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)]
          hover:scale-110 transition
        "
      >
        <FaChevronLeft size={24} />
      </button>

      {/* CHEVRON RIGHT */}
      <button
        onClick={nextSlide}
        className="
          absolute
          top-[162px]
          right-[50px]
          z-20
          w-[48px] h-[48px]
          flex items-center justify-center
          bg-white
          rounded-full
          shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)]
          hover:scale-110 transition
        "
      >
        <FaChevronRight size={24} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
