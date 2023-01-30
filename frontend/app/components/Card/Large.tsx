import { type ReactNode } from "react";
import * as Button from "~/components/Button";

export const Large = ({
  children,
  links,
  title,
}: {
  children: ReactNode;
  links: { to: string; title: string }[];
  title: string;
}) => (
  <article className="flex flex-col bg-white/5 rounded-xl">
    {children}
    <div className="py-2 px-4 flex justify-between items-center bg-white/5 rounded-b-xl">
      <h2 className="font-semibold text-2xl">{title}</h2>
      {links.map((link, i) => (
        <Button.AsLink to={link.to} key={i}>
          {link.title}
        </Button.AsLink>
      ))}
    </div>
  </article>
);
