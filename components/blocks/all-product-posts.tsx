import SectionContainer from "@/components/ui/section-container";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityProducts } from "@/sanity/lib/product";
import ProductCard from "../ui/product-card";
import CategorySelect from "../ui/category-select";
import { fetchSanityCategories } from "@/sanity/lib/fetch";
import ProductFilterClient from "./product-filter-client";

type AllProductPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "all-product-posts" }
>;

export default async function AllProductsPosts({ padding, colorVariant }: AllProductPostsProps) {
  const color = stegaClean(colorVariant);
  const posts = await fetchSanityProducts();
  const category = await fetchSanityCategories();

  return (
    <SectionContainer color={color} padding={padding}>
      <ProductFilterClient products={posts} categories={category} />
    </SectionContainer>
  );
}
