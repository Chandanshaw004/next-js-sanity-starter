import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS_QUERYResult } from "@/sanity.types";

export function useFilteredProducts(
  products: NonNullable<PRODUCTS_QUERYResult>
) {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.getAll("category");
  const selectedSubcategories = searchParams.getAll("subcategory");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        (p.category?.title && selectedCategories.includes(p.category.title));

      const matchesSubcategory =
        selectedSubcategories.length === 0 ||
        (p.subcategory?.title &&
          selectedSubcategories.includes(p.subcategory.title));

      return matchesCategory && matchesSubcategory;
    });
  }, [products, selectedCategories, selectedSubcategories]);

  return filtered;
}
