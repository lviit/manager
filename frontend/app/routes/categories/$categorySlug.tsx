import { json, type LoaderArgs, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useOutlet } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";

import { graphqlRequest } from "~/api/graphqlRequest";
import { type CategoriesQuery } from "~/api/generates/types";
import { Categories } from "~/api/generates/documentNodes";
import * as Button from "~/components/Button";
import * as Card from "~/components/Card";

// TODO: fix typings
export const loader: LoaderFunction = async ({ params: { categorySlug } }: LoaderArgs) => {
  const category = await graphqlRequest<CategoriesQuery>(Categories, {
    filters: { Slug: { eq: categorySlug } },
  });

  return json(category);
};

const list = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const card = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const heading = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export default function Index() {
  const data = useLoaderData<CategoriesQuery>();
  const [category] = data?.categories?.data ?? [];
  const { Name, products } = category?.attributes ?? {};
  const outlet = useOutlet();

  return (
    <motion.div className="basis-50 mt-40">
      <motion.div
        className="flex items-center justify-between gap-5 mb-5"
        variants={heading}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl font-bold">{Name}</h1>
        <Button.AsLink to="/categories">Close</Button.AsLink>
      </motion.div>
      <motion.ul className="flex flex-col gap-5" variants={list} initial="hidden" animate="visible">
        {products?.data.map(({ id, attributes }) => (
          <motion.li key={id} variants={card}>
            <Card.Small to={`${attributes?.Slug}`}>
              <div className="p-8 rounded-xl bg-white/5" />
              {attributes?.Name}
            </Card.Small>
          </motion.li>
        ))}
      </motion.ul>
      <AnimatePresence>{outlet}</AnimatePresence>
    </motion.div>
  );
}
