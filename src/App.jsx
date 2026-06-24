import {
  Box,
  GlobalStyles,
} from "@mui/material";

import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            background:
              "linear-gradient(135deg, #7F0D16 0%, #A1121B 45%, #D21F2B 100%)",
          },
        }}
      />

      <Box
        sx={{
          minHeight: "100svh",
          background:
            "linear-gradient(135deg, #520b11ff 0%, #A1121B 45%, #b53840ff 100%)",
        }}
      >
        <Header />
        <AppRoutes />
      </Box>
    </>
  );
};

export default App;
