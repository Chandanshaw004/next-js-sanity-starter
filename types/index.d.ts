import { GLOBAL_CONTENT_QUERYResult } from "@/sanity.types";

export type NavItem = {
  label: string;
  href: string;
  target: boolean;
  subMenu?: NavItem[];
};

export type BreadcrumbLink = {
  label: string;
  href: string;
};
export type GlobalContent = NonNullable<GLOBAL_CONTENT_QUERYResult>;
