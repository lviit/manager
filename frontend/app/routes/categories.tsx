import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { graphqlRequest } from "~/api/graphqlRequest";
import { type CategoriesQuery } from "~/api/generates/types";
import { Categories } from "~/api/generates/documentNodes";

import type { LoaderFunction } from "@remix-run/node";

// TODO: fix typings
export const loader: LoaderFunction = async () => {
  const products = await graphqlRequest<CategoriesQuery>(Categories);

  return json(products);
};

export default function Index() {
  const data = useLoaderData<CategoriesQuery>();

  return (
    <div className="text-white/90 bg-stone-900 flex gap-5 p-5">
      <div className="basis-50">
        <h1 className="mt-40 mb-5 text-5xl font-bold">Categories</h1>
        <ul className="flex flex-col gap-5">
          {data?.categories?.data.map(({ id, attributes }) => (
            <li key={id} className="flex flex-col bg-white/5 rounded-xl">
              <ul className="flex gap-5 p-5">
                {attributes?.products?.data.map(({ id, attributes }) => (
                  <li key={id} className="p-16 rounded-xl bg-white/5" />
                ))}
              </ul>
              <div className="py-2 px-4 flex justify-between items-center bg-white/5 rounded-b-xl">
                <span className="font-semibold text-2xl">{attributes?.Name}</span>
                <Link
                  to={`/categories/${id}`}
                  className=" bg-white/5 hover:bg-white/10 py-2 px-5 rounded-xl transition-colors ease-in-out duration-200 text-base uppercase font-bold tracking-widest"
                >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
