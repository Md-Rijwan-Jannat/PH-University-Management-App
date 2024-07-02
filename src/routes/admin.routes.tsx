import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { NavLink } from "react-router-dom";

interface IRoute {
  path: string;
  element: ReactNode;
}

interface ISliderRoute {
  key: string;
  label: ReactNode;
  children?: ISliderRoute[];
}

/*
Programmatically way
*/
const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

const adminRoutes = adminPaths.reduce((acc: IRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  } else if (item.children) {
    item.children.forEach((child) => {
      if (child.path && child.element) {
        acc.push({
          path: child.path,
          element: child.element,
        });
      }
    });
  }

  return acc;
}, []);

const adminSliderRoutes = adminPaths.reduce((acc: ISliderRoute[], item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
    });
  } else if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
      })),
    });
  }
  return acc;
}, []);

export const AdminRoutes = adminRoutes;
export const AdminSliderRoutes = adminSliderRoutes;

/*
Hard coded way
*/

// const adminPaths = [
//   {
//     name: "Dashboard",
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     name: "Create Admin",
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     name: "Create Faculty",
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
//   {
//     name: "Create Student",
//     path: "create-student",
//     element: <CreateStudent />,
//   },
// ];

// export const AdminPaths = adminPaths;
