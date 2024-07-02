import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
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
];

export const AdminPaths = adminPaths;