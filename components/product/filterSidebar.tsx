"use client";

import { CATEGORY_QUERYResult } from "@/sanity.types";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

type FilterSidebarProps = {
  categories: NonNullable<CATEGORY_QUERYResult>;
};

export default function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams
    .getAll("category")
    .map((v) => v.toLowerCase());
  const selectedSubcategories = searchParams
    .getAll("subcategory")
    .map((v) => v.toLowerCase());

  const updateParams = (key: "category" | "subcategory", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const values = params.getAll(key).map((v) => v.toLowerCase());
    const isChecked = values.includes(value.toLowerCase());

    if (isChecked) {
      const newValues = values.filter((v) => v !== value.toLowerCase());
      params.delete(key);
      newValues.forEach((v) => params.append(key, v));

      if (key === "category") {
        const removedCategory = categories.find(
          (cat) => cat.title?.toLowerCase() === value.toLowerCase()
        );
        if (removedCategory?.subcategory) {
          removedCategory.subcategory.forEach((sub) => {
            if (sub?.title) {
              const currentSubs = params
                .getAll("subcategory")
                .map((v) => v.toLowerCase());
              if (currentSubs.includes(sub.title.toLowerCase())) {
                const filteredSubs = currentSubs.filter(
                  (s) => s !== sub.title!.toLowerCase()
                );
                params.delete("subcategory");
                filteredSubs.forEach((s) => params.append("subcategory", s));
              }
            }
          });
        }
      }
    } else {
      params.append(key, value.toLowerCase());
    }

    if (key === "category") {
      const selectedCats = params
        .getAll("category")
        .map((v) => v.toLowerCase());

      const allowedSubcategories = new Set(
        categories
          .filter(
            (cat) => cat.title && selectedCats.includes(cat.title.toLowerCase())
          )
          .flatMap((cat) =>
            cat.subcategory
              ? cat.subcategory
                  .map((sub) => sub.title)
                  .filter((title): title is string => !!title)
                  .map((title) => title.toLowerCase())
              : []
          )
      );

      const currentSubcategories = params
        .getAll("subcategory")
        .map((v) => v.toLowerCase());
      params.delete("subcategory");
      currentSubcategories.forEach((sub) => {
        if (allowedSubcategories.has(sub)) {
          params.append("subcategory", sub);
        }
      });
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="w-60 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
      {categories.map((cat) => {
        const categoryTitle = cat.title ?? "";
        const isCatSelected = selectedCategories.includes(
          categoryTitle.toLowerCase()
        );

        return (
          <div key={cat._id} className="mb-4">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={isCatSelected}
                onCheckedChange={() => updateParams("category", categoryTitle)}
              />
              <span className="font-medium">{categoryTitle}</span>
            </label>

            {isCatSelected &&
              Array.isArray(cat.subcategory) &&
              cat.subcategory.length > 0 && (
                <div className="ml-6 mt-2 space-y-2">
                  {cat.subcategory.map((sub) => {
                    if (!sub?.title) return null;
                    const isSubSelected = selectedSubcategories.includes(
                      sub.title.toLowerCase()
                    );

                    return (
                      <label
                        key={sub._id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={isSubSelected}
                          onCheckedChange={() =>
                            updateParams("subcategory", sub.title!)
                          }
                        />
                        <span className="text-sm text-gray-700">
                          {sub.title}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
          </div>
        );
      })}
    </aside>
  );
}
