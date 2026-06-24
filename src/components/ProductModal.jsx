import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductModal = ({
  open,
  onClose,
  product,
}) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogContent>

        <img
          src={product.image}
          alt={product.title}
          width="100%"
          style={{
            backgroundColor: "#FFFBF2",
          }}
        />

        <Typography variant="h6">
          {product.title}
        </Typography>

        <Typography>
          {product.description}
        </Typography>

        <Typography
          sx={{
            color: "error.main",
            fontWeight: 700,
          }}
        >
          ${product.price}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Button
            onClick={() =>
              setQuantity((prev) =>
                Math.max(1, prev - 1)
              )
            }
          >
            -
          </Button>

          <Typography>
            {quantity}
          </Typography>

          <Button
            onClick={() =>
              setQuantity((prev) => prev + 1)
            }
          >
            +
          </Button>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          color="secondary"
          sx={{
            mt: 2,
            "&:hover": {
              bgcolor: "#E6A800",
            },
          }}
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
