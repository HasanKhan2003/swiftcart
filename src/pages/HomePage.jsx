import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

import { useGetProductsQuery } from "../api/productsApi";

const HomePage = () => {
  const [selectedProduct, setSelectedProduct] =
    useState(null);
  const navigate = useNavigate();

  const { data = [] } =
    useGetProductsQuery();

  return (
    <Container sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          bgcolor: "background.paper",
          boxShadow:
            "0 10px 24px rgba(59, 31, 0, 0.18)",
          borderRadius: 1,
          px: 2,
          py: 1.5,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: 700,
          }}
        >
          Shop by your favorite collection
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<CategoryIcon />}
          sx={{
            fontWeight: 700,
            boxShadow:
              "0 6px 16px rgba(59, 31, 0, 0.24)",
            "&:hover": {
              bgcolor: "#E6A800",
            },
          }}
          onClick={() => navigate("/categories")}
        >
          Categories
        </Button>
      </Box>

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

export default HomePage;
