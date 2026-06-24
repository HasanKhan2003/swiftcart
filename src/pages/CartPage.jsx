import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const items = useSelector(
    (state) => state.cart.items
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = useMemo(
    () =>
      items.reduce(
        (acc, item) =>
          acc + item.price * item.quantity,
        0
      ),
    [items]
  );

  const handleCheckout = () => {
    if (!items.length) return;

    toast.success(
      "Your order has been confirmed."
    );

    dispatch(clearCart());

    navigate("/");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, pb: 4 }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.85fr) minmax(300px, 1fr)",
          },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <Card
          sx={{
            textAlign: "left",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow:
              "0 10px 24px rgba(59, 31, 0, 0.18)",
            height: { md: 548 },
          }}
        >
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 2,
              }}
            >
              Shopping Cart
            </Typography>

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                pr: { md: 1 },
              }}
            >
              {items.length === 0 ? (
                <Typography color="text.secondary">
                  Your cart is empty.
                </Typography>
              ) : (
                items.map((item, index) => (
                  <Box key={item.id}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                        alignItems: "center",
                        gap: 2,
                        py: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.title}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "contain",
                          p: 1,
                          boxSizing: "border-box",
                          flexShrink: 0,
                          bgcolor: "#FFFBF2",
                          borderRadius: 1,
                        }}
                      />

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            lineHeight: 1.3,
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          sx={{
                            color: "error.main",
                            fontWeight: 700,
                            mt: 0.5,
                          }}
                        >
                          ${item.price}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          width: {
                            xs: "100%",
                            sm: "auto",
                          },
                          alignItems: "center",
                          justifyContent: {
                            xs: "space-between",
                            sm: "flex-start",
                          },
                          gap: 2,
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border:
                              "1px solid rgba(95, 70, 52, 0.22)",
                            borderRadius: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(
                                decreaseQuantity(item.id)
                              )
                            }
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>

                          <Typography
                            sx={{
                              minWidth: 28,
                              textAlign: "center",
                              fontWeight: 700,
                            }}
                          >
                            {item.quantity}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(
                                increaseQuantity(item.id)
                              )
                            }
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Box
                          sx={{
                            minWidth: 100,
                            textAlign: "right",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "error.main",
                              fontWeight: 700,
                            }}
                          >
                            $
                            {(
                              item.price * item.quantity
                            ).toFixed(2)}
                          </Typography>

                          <Button
                            size="small"
                            color="inherit"
                            sx={{
                              color: "text.secondary",
                              minWidth: 0,
                              px: 0,
                              textTransform: "none",
                            }}
                            onClick={() =>
                              dispatch(
                                removeFromCart(item.id)
                              )
                            }
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </Box>

                    {index < items.length - 1 && (
                      <Divider
                        sx={{
                          borderColor:
                            "rgba(95, 70, 52, 0.18)",
                        }}
                      />
                    )}
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Card>

        <Card
          sx={{
            textAlign: "left",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow:
              "0 10px 24px rgba(59, 31, 0, 0.18)",
            height: { md: 548 },
          }}
        >
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                Order Summary
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography color="text.secondary">
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    color: "error.main",
                    fontWeight: 700,
                  }}
                >
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography color="text.secondary">
                  Estimated Shipping
                </Typography>
                <Typography color="text.secondary">
                  Free
                </Typography>
              </Box>

              <Divider
                sx={{
                  borderColor:
                    "rgba(95, 70, 52, 0.18)",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 2,
                mt: "auto",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                Total
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "error.main",
                  fontWeight: 700,
                }}
              >
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              disabled={!items.length}
              sx={{
                alignSelf: "flex-end",
                px: 3,
                mt: 3,
                fontWeight: 700,
                boxShadow:
                  "0 6px 16px rgba(59, 31, 0, 0.24)",
                "&:hover": {
                  bgcolor: "#E6A800",
                },
              }}
              onClick={handleCheckout}
            >
              CHECKOUT
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default CartPage;
