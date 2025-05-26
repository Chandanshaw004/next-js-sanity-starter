import { defineType, defineField } from "sanity";
import { Globe, Link2 } from "lucide-react";

export default defineType({
  name: "globalContent",
  title: "Global Content",
  type: "document",
  icon: Globe,
  groups: [
    {
      name: "header",
      title: "Header Settings",
    },
    {
      name: "footer",
      title: "Footer Settings",
    },
  ],

  fields: [
    // === HEADER SECTION ===
    defineField({
      name: "headerLogo",
      title: "Header Logo",
      type: "image",
      group: "header",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "headerNavItems",
      title: "Header Navigation",
      type: "array",
      group: "header",
      of: [
        {
          type: "object",
          name: "navItem",
          title: "Navigation Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "url",
              validation: (Rule) => Rule.uri({ allowRelative: true }),
            }),
            defineField({
              name: "target",
              title: "Open in new tab?",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "subMenu",
              title: "Sub Menu",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "subNavItem",
                  title: "Sub Menu Item",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "href",
                      title: "Link",
                      type: "url",
                      validation: (Rule) => Rule.uri({ allowRelative: true }),
                    }),
                    defineField({
                      name: "target",
                      title: "Open in new tab?",
                      type: "boolean",
                      initialValue: false,
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // === FOOTER SECTION ===
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      group: "footer",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      group: "footer",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          icon: Link2,
          fields: [
            defineField({
              name: "platform",
              title: "Platform Name",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.uri({ allowRelative: false }),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name or class (used in frontend)",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Link Groups",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          title: "Link Group",
          fields: [
            defineField({
              name: "title",
              title: "Group Title",
              type: "string",
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  title: "Footer Link",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Link Title",
                      type: "string",
                    }),
                    defineField({
                      name: "href",
                      title: "Link URL",
                      type: "url",
                      validation: (Rule) => Rule.uri({ allowRelative: true }),
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Global Site Content",
        subtitle: "Header and Footer settings",
      };
    },
  },
});
