'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "../ui/product-card";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilterClient({ products, categories }: any) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedCategories, setSelectedCategories] = useState<{ [cat: string]: string[] }>({});
    const [shouldUpdateUrl, setShouldUpdateUrl] = useState(false);

    const category = searchParams.get("category");       // "ARC"
    const subcategory = searchParams.get("subcategory"); // "Mosfet"

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const urlCategory = params.getAll("category");
        const urlSubcategory = params.getAll("subcategory");

        const init: { [cat: string]: string[] } = {};

        urlCategory.forEach((cat) => {
            init[cat] = [];
        });

        urlSubcategory.forEach((sub) => {
            products.forEach((p: any) => {
                if (p.subcategory?.title === sub) {
                    const parent = p.category?.title;
                    if (parent) {
                        if (!init[parent]) init[parent] = [];
                        if (!init[parent].includes(sub)) init[parent].push(sub);
                    }
                }
            });
        });

        setSelectedCategories(init);
    }, []);

    useEffect(() => {
        if (!shouldUpdateUrl) return;

        const params = new URLSearchParams();
        Object.entries(selectedCategories).forEach(([parent, subs]) => {
            params.append("category", parent);
            subs.forEach((sub) => params.append("subcategory", sub));
        });

        router.push(`?${params.toString()}`, { scroll: false });
        setShouldUpdateUrl(false);
    }, [selectedCategories, shouldUpdateUrl]);
    
    useEffect(() => {
        if (category) {
            setSelectedCategories({
                [category]: subcategory ? [subcategory] : [],
            });
        }
    }, [category, subcategory]);

    const handleParentToggle = (parentTitle: string) => {
        setSelectedCategories((prev) => {
            const updated = { ...prev };
            if (updated[parentTitle]) {
                delete updated[parentTitle];
            } else {
                updated[parentTitle] = [];
            }
            setShouldUpdateUrl(true); // trigger URL update in effect
            return updated;
        });
    };

    const handleSubToggle = (parentTitle: string, subTitle: string) => {
        setSelectedCategories((prev) => {
            const current = prev[parentTitle] ?? [];
            const updatedSub = current.includes(subTitle)
                ? current.filter((s) => s !== subTitle)
                : [...current, subTitle];

            const updated = { ...prev, [parentTitle]: updatedSub };
            setShouldUpdateUrl(true); // trigger URL update in effect
            return updated;
        });
    };

    const filteredProducts = products.filter((product: any) => {
        const parent = product.category?.title;         // e.g., "ARC" or "TIG"
        const sub = product.subcategory?.title;         // e.g., "Mosfet"

        // Check if this category is selected
        if (!selectedCategories[parent]) return false;

        // If no subcategory selected under parent, show all in parent category
        if (selectedCategories[parent].length === 0) return true;

        // Only show if both category and subcategory match
        return selectedCategories[parent].includes(sub);
    });


    return (
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filter */}
            <aside className="lg:w-1/4 w-full space-y-6">
                <h2 className="text-xl font-bold">Filter by Category</h2>
                {categories.map((cat: any) => (
                    <div key={cat.title} className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-base">
                            <input
                                type="checkbox"
                                checked={selectedCategories[cat.title] !== undefined}
                                onChange={() => handleParentToggle(cat.title)}
                                className="accent-primary"
                            />
                            {cat.title}
                        </label>
                        {selectedCategories[cat.title] !== undefined &&
                            cat.subcategory?.map((sub: any) => (
                                <label
                                    key={sub.title}
                                    className="ml-6 flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories[cat.title]?.includes(sub.title)}
                                        onChange={() => handleSubToggle(cat.title, sub.title)}
                                        className="accent-primary"
                                    />
                                    {sub.title}
                                </label>
                            ))}
                    </div>
                ))}
            </aside>

            {/* Products Grid */}
            <main className="w-full lg:w-3/4">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((post: any) => (
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
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground text-lg">
                        No products available.
                    </div>
                )}
            </main>
        </div>
    );
}
