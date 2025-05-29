import { groq } from "next-sanity";

export const PRODUCT_QUERY = groq`*[_type == "product" && slug.current == $slug][0]{
    title,
    slug,
    image{
      ...,
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },    
    description,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        }
      }
    },    
    category->{
    _id,
    title
  },
  subcategory->{
    _id,
    title
  },
    _createdAt,
    _updatedAt,
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
}`;

export const PRODUCTS_QUERY = groq`*[_type == "product" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    description,
    category->{
    _id,
    title
  },
  subcategory->{
    _id,
    title
  },
    image{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
}`;

export const PRODUCTS_SLUGS_QUERY = groq`*[_type == "product" && defined(slug)]{slug}`;
