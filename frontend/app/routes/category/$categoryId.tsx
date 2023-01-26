import { json, type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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

  console.log("data", data);

  const { Name, products } = data?.category?.data?.attributes ?? {};

  return (
    <div>
      <h1>{Name}</h1>
      <ul>
        {products?.data.map(({ id, attributes }) => (
          <li key={id}>
            <Link to={`/products/${id}`}>{attributes?.Name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
