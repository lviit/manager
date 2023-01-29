import type { ReactNode } from "react";

// TODO: fix close button positioning
export const Container = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}): JSX.Element => (
  <div className="bg-stone-800 rounded-xl p-5 flex flex-col min-w-[500px]">
    {children}
    {onClose ? (
      <button
        aria-label="close"
        onClick={onClose}
        className="self-end mt-5 bg-white/5 hover:bg-white/10 py-2 px-5 rounded-xl transition-colors ease-in-out duration-200 text-base uppercase font-bold tracking-widest"
      >
        Close
      </button>
    ) : null}
  </div>
);
