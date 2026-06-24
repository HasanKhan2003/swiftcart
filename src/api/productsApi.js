import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),

    getCategories: builder.query({
      query: () => "categories",
    }),

    getCategory: builder.query({
      query: (categorySlug) =>
        `categories/${encodeURIComponent(categorySlug)}`,
    }),

    getProductsByCategory: builder.query({
      query: (categorySlug) =>
        `products/category/${encodeURIComponent(categorySlug)}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
