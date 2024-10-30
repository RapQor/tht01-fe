import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import CartPage from "../pages/cart-page";
import ProductDetail from "../pages/product-detail";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/detail/:id",
    element: <ProductDetail />,
  },
];
