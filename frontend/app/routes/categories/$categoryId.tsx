import { json, type LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { graphqlRequest } from "~/api/graphqlRequest";
import { type CategoryQuery } from "~/api/generates/types";
import { Category } from "~/api/generates/documentNodes";

import type { LoaderFunction } from "@remix-run/node";

// TODO: fix typings
export const loader: LoaderFunction = async ({ params: { categoryId } }: LoaderArgs) => {
  const category = await graphqlRequest<CategoryQuery>(Category, { id: categoryId });

  return json(category);
};

export default function Index() {
  const data = useLoaderData<CategoryQuery>();
  const { Name, products } = data?.category?.data?.attributes ?? {};

  return (
    <div className="basis-50 mt-40">
      <div className="flex items-center justify-between gap-5 mb-5">
        <h1 className="text-5xl font-bold">{Name}</h1>
        <Link
          to="/categories"
          className=" bg-white/5 hover:bg-white/10 py-2 px-5 rounded-xl transition-colors ease-in-out duration-200 text-base uppercase font-bold tracking-widest"
        >
          Close
        </Link>
      </div>
      <ul className="flex flex-col gap-5">
        {products?.data.map(({ id, attributes }) => (
          <li key={id} className="bg-white/5 rounded-xl p-2 text-lg flex gap-5">
            <div className="p-8 rounded-xl bg-white/5" />
            <Link to={`${id}`}>{attributes?.Name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
