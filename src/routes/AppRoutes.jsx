import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import CategoriesPage from "../pages/CategoriesPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/cart"
        element={<CartPage />}
      />

      <Route
        path="/categories"
        element={<CategoriesPage />}
      />

      <Route
        path="/categories/:category"
        element={<CategoryProductsPage />}
      />
    </Routes>
  );
};

export default AppRoutes;
