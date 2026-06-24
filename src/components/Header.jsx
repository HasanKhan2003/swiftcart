import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const count = useSelector(
    (state) =>
      state.cart.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      )
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.paper",
        color: "primary.main",
        boxShadow:
          "0 2px 14px rgba(59, 31, 0, 0.16)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          SwiftCart
        </Typography>

        <IconButton
          sx={{ color: "primary.main" }}
          onClick={() => navigate("/cart")}
        >
          <Badge badgeContent={count} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
