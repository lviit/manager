import { json, type LoaderArgs } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import { useNavigate } from "react-router-dom";
import type { LoaderFunction } from "@remix-run/node";

import { graphqlRequest } from "~/api/graphqlRequest";
import { type ProductsQuery } from "~/api/generates/types";
import { Products } from "~/api/generates/documentNodes";
import * as Modal from "~/components/Modal";
import { useLoaderDataWithUnmount } from "~/utils/useLoaderDataWithUnmount";

// TODO: fix typings
export const loader: LoaderFunction = async ({ params: { productSlug } }: LoaderArgs) => {
  const products = await graphqlRequest<ProductsQuery>(Products, {
    filters: { Slug: { eq: productSlug } },
  });

  return json(products);
};

export default function Index() {
  const navigate = useNavigate();
  const [_, __, prevPage] = useMatches();
  const data = useLoaderDataWithUnmount<ProductsQuery>();
  const [product] = data?.products?.data ?? [];
  const { Name, Price, Brand, Website } = product?.attributes || {};

  return (
    <Modal.Overlay>
      <Modal.Container onClose={() => navigate(prevPage)}>
        <h1 className="text-4xl font-bold mb-5">{Name}</h1>
        <dl>
          <dt>Price</dt>
          <dd>{Price}</dd>
          <dt>Brand</dt>
          <dd>{Brand}</dd>
          <dt>Website</dt>
          <dd>{Website}</dd>
        </dl>
      </Modal.Container>
    </Modal.Overlay>
  );
}
