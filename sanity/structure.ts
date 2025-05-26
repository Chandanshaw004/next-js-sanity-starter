import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Files,
  BookA,
  User,
  ListCollapse,
  Quote,
  Layout,
  Globe,
} from "lucide-react";
import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder, context: any) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Global Site Settings")
        .id("globalContent")
        .schemaType("globalContent")
        .icon(Globe)
        .child(
          S.editor()
            .id("globalContent")
            .title("Global Site Settings")
            .schemaType("globalContent")
            .documentId("globalContent")
        ),
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: Files,
        S,
        context,
      }),
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Post")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]) // Default ordering
        ),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categories",
        icon: BookA,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Authors",
        icon: User,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "faq",
        title: "FAQs",
        icon: ListCollapse,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        icon: Quote,
        S,
        context,
      }),
    ]);
