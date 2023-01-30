import { Link } from "@remix-run/react";
import { type ReactNode } from "react";

export const Small = ({ children, to }: { children: ReactNode; to: string }) => (
  <article className="bg-white/5 hover:bg-white/10 rounded-xl transition-colors ease-in-out duration-200">
    <Link to={to} className="flex gap-5 p-2 text-lg">
      {children}
    </Link>
  </article>
);
