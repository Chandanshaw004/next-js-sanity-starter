'use client';
import { cn } from "@/lib/utils";
import { CATEGORY_QUERYResult } from "@/sanity.types";
import { useState } from "react";

type PostHeroProps = NonNullable<CATEGORY_QUERYResult[number]>;

export default function CategorySelect(category: PostHeroProps) {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedSubs, setSelectedSubs] = useState<string[]>([]);

    const toggleSub = (title: string) => {
        setSelectedSubs((prev) =>
            prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
        );
    };
    return (
        <div className="border rounded-3xl p-6 bg-white dark:bg-zinc-900 shadow-sm">
            <label className="flex items-center space-x-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                        setIsChecked(e.target.checked);
                        if (!e.target.checked) setSelectedSubs([]); // reset subs
                    }}
                    className="w-5 h-5"
                />
                <span className="text-lg font-semibold text-primary">
                    {category?.title}
                </span>
            </label>

            {isChecked && (category?.subcategory?.length ?? 0) > 0 && (
                <div className="mt-4 ml-6 flex flex-col gap-2">
                    {category.subcategory?.map((sub, idx) => (
                        <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedSubs.includes(sub.title ?? "")}
                                onChange={() => toggleSub(sub.title ?? "")}
                                className="w-4 h-4"
                            />
                            <span className="text-sm text-muted-foreground">{sub.title}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
