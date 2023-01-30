import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Button } from "~/components/Button";

const container = {
  hidden: { y: -50, opacity: 0 },
  exit: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const Container = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}): JSX.Element => (
  <motion.div
    className="bg-stone-800 rounded-xl p-5 flex flex-col min-w-[500px]"
    variants={container}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
    {onClose ? (
      <div className="self-end mt-4">
        <Button onClick={onClose}>Close</Button>
      </div>
    ) : null}
  </motion.div>
);
