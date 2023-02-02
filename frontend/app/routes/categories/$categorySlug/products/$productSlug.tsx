import { json, type LoaderArgs } from "@remix-run/node";
import { useMatches } from "@remix-run/react";

import { graphqlRequest } from "~/api/graphqlRequest";
import { type ProductQuery } from "~/api/generates/types";
import { Product } from "~/api/generates/documentNodes";
import * as Modal from "~/components/Modal";
import * as Button from "~/components/Button";
import { useLoaderDataWithUnmount } from "~/utils/useLoaderDataWithUnmount";

export const loader = async ({ params: { productSlug } }: LoaderArgs) => {
  const products = await graphqlRequest<ProductQuery>(Product, {
    filters: { Slug: { eq: productSlug } },
  });

  const [product] = products?.products?.data ?? [];

  return json({ product, CONTENT_MANAGER_URL: process.env.CONTENT_MANAGER_URL });
};

export default function Index() {
  const [_, __, prevPage] = useMatches();
  const {product, CONTENT_MANAGER_URL} = useLoaderDataWithUnmount<typeof loader>();
  const { Name, Price, Brand, Website, categories } = product.attributes || {};

  return (
    <Modal.Overlay>
      <Modal.Container
        links={[
          {
            title: "Edit",
            to: `${CONTENT_MANAGER_URL}/collectionType/api::product.product/${product.id}`,
            external: true,
          },
          { title: "Close", to: prevPage },
        ]}
      >
        <h1 className="text-4xl font-bold mb-5">{Name}</h1>
        <dl>
          <dt>Categories</dt>
          <dd>
            <ul className="flex gap-5 my-5">
              {categories?.data.map(({ attributes }) => (
                <li key={attributes?.Slug}>
                  <Button.AsLink to={`/categories/${attributes?.Slug}`}>
                    {attributes?.Name}
                  </Button.AsLink>
                </li>
              ))}
            </ul>
          </dd>
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
