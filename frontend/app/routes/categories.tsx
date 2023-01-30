import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useMatches, useOutlet } from "@remix-run/react";
import { motion } from "framer-motion";

import { graphqlRequest } from "~/api/graphqlRequest";
import { type CategoriesQuery } from "~/api/generates/types";
import { Categories } from "~/api/generates/documentNodes";
import * as Card from "~/components/Card";

// TODO: fix typings
export const loader: LoaderFunction = async () => {
  const products = await graphqlRequest<CategoriesQuery>(Categories);

  return json(products);
};

export default function Index() {
  const data = useLoaderData<CategoriesQuery>();
  const [_, __, categoryPage] = useMatches();
  const outlet = useOutlet();

  return (
    <div className="text-white/90 bg-stone-900 flex gap-5 p-5">
      <div className="basis-50">
        <h1 className="mt-40 mb-5 text-5xl font-bold">Categories</h1>
        <ul className="flex flex-col gap-5">
          {data?.categories?.data.map(({ id, attributes }) => (
            <li key={id} className="flex flex-col bg-white/5 rounded-xl">
              <Card.Large
                title={attributes?.Name ?? ""}
                links={[{ title: "Details", to: `/categories/${attributes?.Slug}` }]}
              >
                <ul className="flex gap-5 p-5">
                  {attributes?.products?.data.map(({ id }) => (
                    <li key={id} className="p-16 rounded-xl bg-white/5" />
                  ))}
                </ul>
              </Card.Large>
            </li>
          ))}
        </ul>
      </div>
      <motion.section key={categoryPage?.pathname}>{outlet}</motion.section>
    </div>
  );
}
