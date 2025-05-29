import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const allProductQuery = groq`
  _type == "all-product-posts" => {
    _type,
    _key,
    padding,
    colorVariant,
  }
`;
