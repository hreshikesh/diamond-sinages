import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="font-display text-3xl font-semibold tracking-[-0.05em] text-[#f4f2ed]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              DDSPL
            </motion.div>

            <div className="h-px w-24 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-[#f4f2ed]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.25,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            </div>

            <motion.span
              className="text-[9px] uppercase tracking-[0.35em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Display Solutions
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}