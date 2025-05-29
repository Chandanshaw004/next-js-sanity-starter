import { CATEGORY_QUERYResult, PRODUCT_QUERYResult, PRODUCTS_QUERYResult, PRODUCTS_SLUGS_QUERYResult } from "@/sanity.types";
import { sanityFetch } from "./live";
import { PRODUCT_QUERY, PRODUCTS_QUERY, PRODUCTS_SLUGS_QUERY } from "../queries/products";
import { CATEGORY_QUERY } from "../queries/category";


export const fetchSanityProducts = async (): Promise<PRODUCTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PRODUCTS_QUERY,
  });
  return data;
};

export const fetchSanityProductsBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PRODUCT_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PRODUCT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityProductsStaticParams =
  async (): Promise<PRODUCTS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: PRODUCTS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };



export const fetchSanityCategories =
  async (): Promise<CATEGORY_QUERYResult> => {
    const { data } = await sanityFetch({
      query: CATEGORY_QUERY,
    });    

    return data;
  };
