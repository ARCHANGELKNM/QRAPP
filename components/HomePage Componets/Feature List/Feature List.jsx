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
    <div className="overflow-hidden py-12 bg-gray-100 dark:bg-gray-800">
      <motion.div
        ref={containerRef}
        className="flex space-x-6"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {features.concat(features).map((feature, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={index}
              data-index={index}
              className={`feature-card min-w-[250px] h-40 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col justify-center items-center p-6 transition-all duration-300 ${
                isActive ? "ring-4 ring-primary scale-110" : ""
              }`}
            >
              <span className="text-4xl mb-2">{feature.icon}</span>
              <h3
                className={`text-lg text-center transition-all duration-300 ${
                  isActive
                    ? "font-extrabold text-gray-900 dark:text-white"
                    : "font-medium text-gray-600 dark:text-gray-400"
                }`}
              >
                {feature.title}
              </h3>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
