import { GLOBAL_CONTENT_QUERYResult } from "@/sanity.types";

type NavItem = {
  label: string;
  href: string;
  target: boolean;
  subMenu?: {
    label: string;
    href: string;
    target: boolean;
    subSubMenu?: {
      label: string;
      href: string;
      target: boolean;
    }[];
  }[];
};

export type BreadcrumbLink = {
  label: string;
  href: string;
};
export type GlobalContent = NonNullable<GLOBAL_CONTENT_QUERYResult>;
