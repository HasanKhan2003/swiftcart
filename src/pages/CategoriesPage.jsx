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

import { useGetCategoriesQuery } from "../api/productsApi";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data = [] } = useGetCategoriesQuery();

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
        {data.map((category) => (
          <Card
            key={category.slug}
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
                    category.slug
                  )}`
                )
              }
            >
              <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
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
                  {category.name}
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
