import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

import {
  useGetCategoryQuery,
  useGetProductsByCategoryQuery,
} from "../api/productsApi";

const CategoryProductsPage = () => {
  const { categorySlug } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const { data: category } =
    useGetCategoryQuery(categorySlug);
  const { data = [] } =
    useGetProductsByCategoryQuery(categorySlug);

  return (
    <Container sx={{ mt: 3, pb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          color: "#FFF7ED",
          fontWeight: 700,
          mb: 2,
        }}
      >
          {category?.name || categorySlug}
        </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        {data.map((product) => (
          <Box
            key={product.id}
            sx={{ minWidth: 0 }}
          >
            <ProductCard
              product={product}
              onOpen={setSelectedProduct}
            />
          </Box>
        ))}
      </Box>

      <ProductModal
        open={Boolean(selectedProduct)}
        product={selectedProduct}
        onClose={() =>
          setSelectedProduct(null)
        }
      />
    </Container>
  );
};

export default CategoryProductsPage;
