import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
    <div>
      <h1>categories</h1>
      <ul>
        {data?.categories?.data.map(({ id, attributes }) => (
          <li key={id}>
            <Link to={`/category/${id}`}>{attributes?.Name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
