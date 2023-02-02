import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { type RouteMatch } from "@remix-run/react";

import * as Button from "~/components/Button";

const container = {
  hidden: { y: -50, opacity: 0 },
  exit: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const Container = ({
  children,
  links,
}: {
  children: ReactNode;
  links: { to: string | RouteMatch; title: string; external?: boolean }[];
}): JSX.Element => (
  <motion.div
    className="bg-stone-800 rounded-xl p-5 flex flex-col min-w-[500px]"
    variants={container}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
    <ul className="flex gap-4 justify-end">
      {links.map(({ to, external, title }, i) => (
        <li key={i}>
          <Button.AsLink to={to} external={external}>
            {title}
          </Button.AsLink>
        </li>
      ))}
    </ul>
  </motion.div>
);
