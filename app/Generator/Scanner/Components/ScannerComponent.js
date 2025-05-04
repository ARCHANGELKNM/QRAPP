import { motion } from "framer-motion";

export function AnimatedCorners() {
  const cornerSize = 30;

  const transition = {
    duration: 1.2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
  };

  return (
    <>
      {/* Top-Left */}
      <motion.div
        className="absolute border-t-4 border-l-4 border-white shadow-white shadow-md"
        style={{ width: cornerSize, height: cornerSize }}
        initial={{ top: "5%", left: "5%" }}
        animate={{ top: "45%", left: "45%" }}
        transition={transition}
      ></motion.div>

      {/* Top-Right */}
      <motion.div
        className="absolute border-t-4 border-r-4 border-white shadow-white shadow-md"
        style={{ width: cornerSize, height: cornerSize }}
        initial={{ top: "5%", right: "5%" }}
        animate={{ top: "45%", right: "45%" }}
        transition={transition}
      ></motion.div>

      {/* Bottom-Left */}
      <motion.div
        className="absolute border-b-4 border-l-4 border-white shadow-white shadow-md"
        style={{ width: cornerSize, height: cornerSize }}
        initial={{ bottom: "5%", left: "5%" }}
        animate={{ bottom: "45%", left: "45%" }}
        transition={transition}
      ></motion.div>

      {/* Bottom-Right */}
      <motion.div
        className="absolute border-b-4 border-r-4 border-white shadow-white shadow-md"
        style={{ width: cornerSize, height: cornerSize }}
        initial={{ bottom: "5%", right: "5%" }}
        animate={{ bottom: "45%", right: "45%" }}
        transition={transition}
      ></motion.div>

      {/* Scanning Laser */}
      <motion.div
        className="absolute left-1/2 w-3/4 h-0.5 bg-red-500 rounded-full opacity-80"
        style={{ transform: "translateX(-50%)" }}
        initial={{ top: "20%" }}
        animate={{ top: "80%" }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>
    </>
  );
}
