import {groq} from '@sanity/client'


export const employeeQuery = groq`*[_type == "employee"]{
  _id,
  title,
  "slug": slug.current,
  "authorName": author->name,
  mainImage,
  publishedAt,
  body
}`
