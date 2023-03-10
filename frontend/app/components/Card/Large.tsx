import { type RouteMatch } from "@remix-run/react";
import { type ReactNode } from "react";
import * as Button from "~/components/Button";

export const Large = ({
  children,
  links,
  title,
}: {
  children: ReactNode;
  links: { to: string | RouteMatch; title: string; external?: boolean }[];
  title: string;
}) => (
  <article className="flex flex-col bg-white/5 rounded-xl">
    {children}
    <div className="py-2 px-4 flex justify-between items-center bg-white/5 rounded-b-xl">
      <h2 className="font-semibold text-2xl">{title}</h2>
      <ul className="flex gap-4">
        {links.map(({to, external, title}, i) => (
          <li key={i}>
            <Button.AsLink to={to} external={external}>
              {title}
            </Button.AsLink>
          </li>
        ))}
      </ul>
    </div>
  </article>
);
