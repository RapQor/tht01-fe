import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import CartPage from "../pages/cart-page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
];
