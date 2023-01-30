import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useMatches, useOutlet } from "@remix-run/react";
import { motion } from "framer-motion";

import { graphqlRequest } from "~/api/graphqlRequest";
import { type CategoriesQuery } from "~/api/generates/types";
import { Categories } from "~/api/generates/documentNodes";
import * as Button from "~/components/Button";

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
              <ul className="flex gap-5 p-5">
                {attributes?.products?.data.map(({ id }) => (
                  <li key={id} className="p-16 rounded-xl bg-white/5" />
                ))}
              </ul>
              <div className="py-2 px-4 flex justify-between items-center bg-white/5 rounded-b-xl">
                <span className="font-semibold text-2xl">{attributes?.Name}</span>
                <Button.AsLink to={`/categories/${id}`}>Details</Button.AsLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <motion.section key={categoryPage?.pathname}>{outlet}</motion.section>
    </div>
  );
}
