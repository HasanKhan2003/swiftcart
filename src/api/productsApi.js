import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),

    getProductsByCategory: builder.query({
      query: (category) =>
        `products/category/${encodeURIComponent(category)}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
