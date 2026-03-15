"use client";

import { motion } from "framer-motion";
import { Pencil, Download, MousePointerClick, QrCode } from "lucide-react";

export default function HowToUse() {
  const steps = [
    { icon: <QrCode size={36} />, text: "Go to the QR Generator" , stepNumber: "Step 1" },
    { icon: <Pencil size={36} />, text: "Fill in required details", stepNumber: "Step 2"  },
    { icon: <MousePointerClick size={36} />, text: "Click Generate", stepNumber: "Step 3" },
    { icon: <Download size={36} />, text: "Click QR to download", stepNumber: "Step 4"  },
  ];

  return (
    <section className="py-20 bg-white px-4">
      <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}  
            className="flex flex-col items-center text-center space-y-4"
          >
            <p className={"font-medium"}>
              {step.stepNumber}
            </p>

            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow">
              {step.icon}
            </div>

            <p className="font-medium">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
