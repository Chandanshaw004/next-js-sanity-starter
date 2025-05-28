import { groq } from "next-sanity";

export const CATEGORY_QUERY = groq`*[_type == "category"]{
  _id,
  title,
  subcategory[]->{
    _id,
    title
  }
}`;

