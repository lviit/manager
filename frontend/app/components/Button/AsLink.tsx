import { Link } from "@remix-run/react";
import { type ReactNode } from "react";

const classes =
  " bg-white/5 hover:bg-white/10 py-2 px-5 rounded-xl transition-colors ease-in-out duration-200 uppercase font-bold tracking-widest";

export const AsLink = ({
  children,
  to,
  external,
}: {
  children: ReactNode;
  to: string;
  external?: boolean;
}) =>
  external ? (
    <a href={to} target="_blank" rel="noreferrer" className={classes}>
      {children}
    </a>
  ) : (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
