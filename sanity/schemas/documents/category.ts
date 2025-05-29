import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { BookA } from "lucide-react";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: BookA,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subcategory", 
      title: "Sub Category",
      type: "array",
      of: [{ type: "reference", to: [{ type: "subcategory" }] }],
    }),
    orderRankField({ type: "category" }),
  ],
});
