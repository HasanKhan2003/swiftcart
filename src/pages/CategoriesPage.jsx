import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useGetProductsQuery } from "../api/productsApi";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const formatCategory = (category) =>
  category
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data = [] } =
    useGetProductsQuery();

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
        Categories
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {categories.map((category) => (
          <Card
            key={category}
            sx={{
              bgcolor: "background.paper",
              boxShadow:
                "0 10px 24px rgba(59, 31, 0, 0.18)",
            }}
          >
            <CardActionArea
              onClick={() =>
                navigate(
                  `/categories/${encodeURIComponent(
                    category
                  )}`
                )
              }
            >
              <CardMedia
                component="img"
                image={
                  data.find(
                    (product) =>
                      product.category === category
                  )?.image
                }
                alt={formatCategory(category)}
                sx={{
                  height: 180,
                  objectFit: "contain",
                  bgcolor: "#FFFBF2",
                  p: 2,
                  boxSizing: "border-box",
                }}
              />

              <CardContent
                sx={{ textAlign: "center" }}
              >
                <Typography
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  {formatCategory(category)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default CategoriesPage;
