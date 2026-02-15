// Feature List Section

"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsLightningChargeFill } from "react-icons/bs"; // instant scannin
import { IoCloudOffline } from "react-icons/io5";  // offline
import { IoPhonePortrait } from "react-icons/io5"; // Mobile
import { FaShare } from "react-icons/fa";  /// share
import { GrSecure } from "react-icons/gr"; // Private


const features = [
  { title: "Instant Scanning", icon: <BsLightningChargeFill/> },
  { title: "Mobile Friendly", icon: <IoPhonePortrait/> },
  { title: " Private", icon: <GrSecure/> },
  { title: "Share Easily", icon:<FaShare/> },
  { title: "Offline Access", icon: <IoCloudOffline/> },
];

export default function Features() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = container.querySelectorAll(".feature-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        rootMargin: "0px",
        threshold: 0.6, // Card needs to be mostly in center
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section className="w-screeen py-12 sm:py-16 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <motion.div
        ref={containerRef}
        className="flex space-x-4 sm:space-x-6 px-4 sm:px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {[...features, ...features].map((feature, index) => (
          <div
            key={index}
            data-index={index}
            className={`
          feature-card
          min-w-[180px] sm:min-w-[240px]
          h-36 sm:h-40
          rounded-2xl
          bg-white dark:bg-gray-800
          shadow-md sm:shadow-lg
          flex flex-col items-center justify-center
          transition-all duration-700
          ${
            activeIndex === index
              ? "sm:scale-110 sm:ring-4 sm:ring-primary "
              : ""
          }
        `}
          >
            <span className="text-3xl sm:text-4xl mb-2 ">
              {feature.icon}
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-center px-2">
              {feature.title}
            </h3>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
