import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS_QUERYResult } from "@/sanity.types";

export function useFilteredProducts(
  products: NonNullable<PRODUCTS_QUERYResult>
) {
  const searchParams = useSearchParams();

  const selectedCategories = searchParams
    .getAll("category")
    .map((v) => v.toLowerCase());
  const selectedSubcategories = searchParams
    .getAll("subcategory")
    .map((v) => v.toLowerCase());

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const productCategory = p.category?.title?.toLowerCase();
      const productSubcategory = p.subcategory?.title?.toLowerCase();

      const matchesCategory =
        selectedCategories.length === 0 ||
        (productCategory && selectedCategories.includes(productCategory));

      const matchesSubcategory =
        selectedSubcategories.length === 0 ||
        (productSubcategory &&
          selectedSubcategories.includes(productSubcategory));

      return matchesCategory && matchesSubcategory;
    });
  }, [products, selectedCategories, selectedSubcategories]);

  return filtered;
}