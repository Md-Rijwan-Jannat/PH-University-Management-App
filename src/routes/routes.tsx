import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { RouterGenerator } from "../utils/routeGenerator";
import { AdminPats } from "./admin.routes";
import { FacultyPats } from "./faculty.routes";
import { StudentPaths } from "./student.routes";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";

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
