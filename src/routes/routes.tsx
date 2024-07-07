import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about";
import Contact from "../pages/contact";
import Login from "../pages/login";
import Register from "../pages/register";
import { RouterGenerator } from "../utils/routeGenerator";
import { AdminPats } from "./admin.routes";
import { FacultyPats } from "./faculty.routes";
import { StudentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: RouterGenerator(AdminPats),
  },
  {
    path: "/faculty",
    element: <App />,
    children: RouterGenerator(FacultyPats),
  },
  {
    path: "/student",
    element: <App />,
    children: RouterGenerator(StudentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
