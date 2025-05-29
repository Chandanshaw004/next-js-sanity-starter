"use client";

import Link from "next/link";
import ProductCard from "../ui/product-card";
import { CATEGORY_QUERYResult, PRODUCTS_QUERYResult } from "@/sanity.types";
import FilterSidebar from "../product/filterSidebar";
import { useFilteredProducts } from "../product/useFilteredProducts";

type Props = {
  products: NonNullable<PRODUCTS_QUERYResult>;
  categories: NonNullable<CATEGORY_QUERYResult>;
};

export default function ProductClient({ products, categories }: Props) {
  const filteredProducts = useFilteredProducts(products);

  return (
    <div className="flex">
      <FilterSidebar categories={categories} />
      <main className="flex-1 grid grid-cols-3 gap-4 p-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No products found.</p>
        ) : (
          filteredProducts.map((post) => (
            <Link
              key={post?.slug?.current}
              href={`/products/${post?.slug?.current}`}
              className="flex w-full"
            >
              <ProductCard
                title={post?.title}
                description={post?.description}
                image={post?.image}
                category={post?.category}
                subcategory={post?.subcategory}
              />
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
