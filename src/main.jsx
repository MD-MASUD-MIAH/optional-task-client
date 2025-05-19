import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Adduser from "./components/Adduser.jsx";
import Alluser from "./components/Alluser.jsx";
import Home from "./components/Home.jsx";
import Root from "./components/Root.jsx";
import Updateuser from "./components/Updateuser.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "/adduser", Component: Adduser },
      {
        path: "/update/:id",

        loader: ({ params }) =>
          fetch(`https://optional-task-server.vercel.app/user/${params.id}`),
        Component: Updateuser,
      },
      {
        path: "/alluser",

        loader: () => fetch("https://optional-task-server.vercel.app/user"),
        Component: Alluser,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
