import { Link } from "@remix-run/react";
import { type ReactNode } from "react";

export const AsLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Link
    to={to}
    className=" bg-white/5 hover:bg-white/10 py-2 px-5 rounded-xl transition-colors ease-in-out duration-200 uppercase font-bold tracking-widest"
  >
    {children}
  </Link>
);
