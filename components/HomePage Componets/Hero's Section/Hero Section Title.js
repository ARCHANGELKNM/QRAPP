"use client";

import { useEffect, useState } from "react";

export default function HeroTitle() {
  const text = "QRA";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, 180);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight flex justify-center">
      <span className="relative inline-flex items-center">
        <span className="animated-gradient-text">{displayed}</span>
        <span className="typing-cursor" />
      </span>
      <span className="ml-3 text-gray-900 dark:text-white">
        , Create Scan
      </span>
    </h1>
  );
}
