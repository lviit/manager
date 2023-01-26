import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { graphqlRequest } from "~/api/graphqlRequest";
import productsQuery from "../api/products.graphql";

import type { LoaderFunction } from "@remix-run/node";
import type { ProductsQuery } from "~/api/generates";

// TODO: fix typings
export const loader: LoaderFunction = async () => {
  const products = await graphqlRequest<ProductsQuery>(productsQuery);

  return json(products);
};

export default function Index() {
  const data = useLoaderData<ProductsQuery>();

  return (
    <div>
      <h1>It's alive!</h1>
      <ul>
        {data?.products?.data.map(({ id, attributes }) => (
          <li key={id}>{attributes?.Name}</li>
        ))}
      </ul>
    </div>
  );
}
