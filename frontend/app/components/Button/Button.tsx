import { type ReactNode } from "react";

export const Button = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className=" bg-white/5 hover:bg-white/10 py-2 px-5 rounded-xl transition-colors ease-in-out duration-200 uppercase font-bold tracking-widest"
  >
    {children}
  </button>
);
