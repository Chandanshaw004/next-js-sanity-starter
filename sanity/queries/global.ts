import { groq } from "next-sanity";
export const GLOBAL_CONTENT_QUERY = groq`
  *[_type == "globalContent"][0] {
  headerLogo,  
  headerNavItems[]{
    label,
    href,
    target,
    subMenu[]{
      label,
      href,
      target,
    }
  },
  footerLogo,  
  footerDescription,
  socialLinks[]{
    platform,
    url,
    icon
  },
  footerLinks[]{
    title,
    links[]{
      title,
      href
    }
  }
}
`;
