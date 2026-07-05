import { AnimatePresence, motion } from "motion/react";
import { IMG } from "@/lib/site-data";

export function LoadingScreen({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: "var(--cream)" }}
        >
          <div className="relative">
            <motion.div
              aria-hidden
              className="absolute inset-0 -m-16 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(46,94,78,0.10), transparent 70%)" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.9, 0.6], scale: [0.6, 1.15, 1] }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
            <motion.img
              src={IMG.logo}
              alt="Amita Rasa"
              className="relative h-36 md:h-44 w-auto"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}