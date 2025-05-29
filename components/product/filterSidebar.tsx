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

  const selectedCategories = searchParams.getAll("category");
  const selectedSubcategories = searchParams.getAll("subcategory");

  const updateParams = (key: "category" | "subcategory", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const values = params.getAll(key);

    if (values.includes(value)) {
      // Remove the value (uncheck)
      const newValues = values.filter((v) => v !== value);
      params.delete(key);
      newValues.forEach((v) => params.append(key, v));

      // If a category is deselected, also remove its subcategories
      if (key === "category") {
        // Find all subcategories under the deselected category
        const removedCategory = categories.find((cat) => cat.title === value);
        if (removedCategory?.subcategory) {
          removedCategory.subcategory.forEach((sub) => {
            if (sub?.title) {
              // Remove each subcategory related to the deselected category
              const currentSubs = params.getAll("subcategory");
              if (currentSubs.includes(sub.title)) {
                // Remove this subcategory from params
                const filteredSubs = currentSubs.filter((s) => s !== sub.title);
                params.delete("subcategory");
                filteredSubs.forEach((s) => params.append("subcategory", s));
              }
            }
          });
        }
      }
    } else {
      // Add the value (check)
      params.append(key, value);
    }

    // If categories updated, clean subcategories not under selected categories
    if (key === "category") {
      // Get all subcategories of currently selected categories
      const allowedSubcategories = new Set(
        categories
          .filter((cat) => {
            if (!cat.title) return false;
            // After update, get updated selected categories from params
            const selectedCats = params.getAll("category");
            return selectedCats.includes(cat.title);
          })
          .flatMap((cat) =>
            cat.subcategory
              ? cat.subcategory
                  .map((sub) => sub.title)
                  .filter((title): title is string => !!title)
              : []
          )
      );

      const currentSubcategories = params.getAll("subcategory");
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
      {categories.map((cat) => (
        <div key={cat._id} className="mb-4">
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={selectedCategories.includes(cat.title!)}
              onCheckedChange={() => updateParams("category", cat.title!)}
            />
            <span className="font-medium">{cat.title}</span>
          </label>

          {selectedCategories.includes(cat.title!) &&
            Array.isArray(cat.subcategory) &&
            cat.subcategory.length > 0 && (
              <div className="ml-6 mt-2 space-y-2">
                {cat.subcategory.map((sub) =>
                  sub?.title ? (
                    <label
                      key={sub._id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={selectedSubcategories.includes(sub.title)}
                        onCheckedChange={() =>
                          updateParams("subcategory", sub.title!)
                        }
                      />
                      <span className="text-sm text-gray-700">{sub.title}</span>
                    </label>
                  ) : null
                )}
              </div>
            )}
        </div>
      ))}
    </aside>
  );
}
