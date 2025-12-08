// HTU stands for How To Use
"use client";

import { motion } from "framer-motion";
import { Pencil, Download, MousePointerClick, QrCode } from "lucide-react";
import GeneratorButton from "@components/HomePage Componets/Generate Button/GeneratorButton";

export default function HowToUse() {
  return (
    <section className="py-20 bg-white text-black px-4">
      <div className="max-w-6xl mx-auto mb-6">
        <h2 className="text-4xl font-bold text-center mb-16">How To Use It</h2>

        <div className="flex flex-col md:flex-row md:justify-between items-center gap-12">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
              <QrCode size={40} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Step 1</h3>
              <p className="text-gray-400 mt-2">
                Navigate To The QR Generator Page
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
              <Pencil size={40} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Step 2</h3>
              <p className="text-gray-400 mt-2">Fill In The Required Fields</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
              <MousePointerClick size={40} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Step 3</h3>
              <p className="text-gray-400 mt-2">Click On The Generate Button</p>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
              <Download size={40} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Step 4</h3>
              <p className="text-gray-400 mt-2">
                Click On The QR Code To Download It
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
