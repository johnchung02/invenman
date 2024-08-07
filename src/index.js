import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import Item from "./components/Item";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ItemList />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <ItemForm />,
      },
    ],
  },
  {
    path: "/inventory/item/:id",
    element: <App />,
    children: [
      {
        path: "/inventory/item/:id",
        element: <Item />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);