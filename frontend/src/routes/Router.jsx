import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import AddProduct from "../pages/AddProduct";
import Products from "../pages/Products";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AddProduct />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);
