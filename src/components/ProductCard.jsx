import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductCard = ({
  product,
  onOpen,
}) => {
  return (
    <Card
      onClick={() => onOpen(product)}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        bgcolor: "background.paper",
        boxShadow:
          "0 10px 24px rgba(59, 31, 0, 0.18)",
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          height: 220,
          objectFit: "contain",
          p: 2,
          boxSizing: "border-box",
          backgroundColor: "#FFFBF2",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            minHeight: "3rem",
          }}
        >
          {product.title}
        </Typography>

        <Typography
          sx={{
            color: "error.main",
            fontWeight: 700,
          }}
        >
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
