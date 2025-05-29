import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityProducts } from "@/sanity/lib/product";
import { fetchSanityCategories } from "@/sanity/lib/fetch";
import ProductClient from "./product-filter-client";

type AllProductPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "all-product-posts" }
>;

export default async function AllProductsPosts({
  padding,
  colorVariant,
}: AllProductPostsProps) {
  const color = stegaClean(colorVariant);
  const posts = await fetchSanityProducts();
  const category = await fetchSanityCategories();

  return (
    <SectionContainer color={color} padding={padding}>
      <ProductClient products={posts} categories={category} />
    </SectionContainer>
  );
}
