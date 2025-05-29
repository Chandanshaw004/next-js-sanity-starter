import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: FileText,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "settings",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
    }),   
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "subcategory" }],
      group: "settings",
      options: {
        filter: ({ document }) => {
          const categoryId = (document as { category?: { _ref?: string } })?.category?._ref;
          if (!categoryId) return {};
          return {
            filter: `_id in *[_type == "category" && _id == $catId][0].subcategory[]._ref`,
            params: { catId: categoryId },
          };
        },
      },
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image - [1200x630]",
      type: "image",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      category: "category.title",
      subcategory: "subcategory.title",
    },   
    prepare(selection) {
      const { category, subcategory } = selection;
      return { ...selection, subtitle: category && `${category} - ${subcategory}` };
    }, 
  },
});
