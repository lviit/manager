import { json, type LoaderArgs } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import { useNavigate } from "react-router-dom";
import type { LoaderFunction } from "@remix-run/node";

import { graphqlRequest } from "~/api/graphqlRequest";
import { type ProductDetailsFragment, type ProductQuery } from "~/api/generates/types";
import { Product } from "~/api/generates/documentNodes";
import * as Modal from "~/components/Modal";
import { useLoaderDataWithUnmount } from "~/utils/useLoaderDataWithUnmount";

// TODO: fix typings
export const loader: LoaderFunction = async ({ params: { productSlug } }: LoaderArgs) => {
  const products = await graphqlRequest<ProductQuery>(Product, {
    filters: { Slug: { eq: productSlug } },
  });

  const [product] = products?.products?.data ?? [];

  return json(product);
};

export default function Index() {
  const navigate = useNavigate();
  const [_, __, prevPage] = useMatches();
  const data = useLoaderDataWithUnmount<ProductDetailsFragment>();
  const { Name, Price, Brand, Website } = data.attributes || {};

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
