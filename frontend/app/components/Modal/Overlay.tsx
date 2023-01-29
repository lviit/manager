import type { ReactNode } from "react";

export const Overlay = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="absolute top-0 bottom-0 left-0 right-0 bg-stone-900/80 flex justify-center items-center">
    {children}
  </div>
);
