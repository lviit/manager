import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData, useMatches } from "@remix-run/react";
import { useNavigate } from "react-router-dom";

import { graphqlRequest } from "~/api/graphqlRequest";
import { type ProductQuery } from "~/api/generates/types";
import { Product } from "~/api/generates/documentNodes";
import * as Modal from "~/components/Modal";

import type { LoaderFunction } from "@remix-run/node";

// TODO: fix typings
export const loader: LoaderFunction = async ({ params: { productId } }: LoaderArgs) => {
  const category = await graphqlRequest<ProductQuery>(Product, { id: productId });

  return json(category);
};

export default function Index() {
  const navigate = useNavigate();
  const [_, __, prevPage] = useMatches();
  const data = useLoaderData<ProductQuery>();
  const { Name, Price, Brand, Website } = data?.product?.data?.attributes || {};

  return (
    <Modal.Overlay>
      <Modal.Container onClose={() => navigate(prevPage)}>
        <h1 className="text-4xl font-bold">{Name}</h1>
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
