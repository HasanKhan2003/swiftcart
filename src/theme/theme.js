import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A1121B",
    },
    secondary: {
      main: "#F4B400",
      contrastText: "#3B1F00",
    },
    error: {
      main: "#B42318",
    },
    text: {
      primary: "#1F2937",
      secondary: "#5F4634",
    },
    background: {
      default: "#A1121B",
      paper: "#FFF7ED",
    },
  },
});

export default theme;
