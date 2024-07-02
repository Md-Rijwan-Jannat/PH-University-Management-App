const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: " <AdminDashboard />",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "<CreateAdmin />",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "<CreateFaculty />",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: " <CreateStudent />",
      },
    ],
  },
];

// const adminRoutes = adminPaths.reduce((acc, item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   } else if (item.children) {
//     item.children.forEach((child) => {
//       if (child.path && child.element) {
//         acc.push({
//           path: child.path,
//           element: child.element,
//         });
//       }
//     });
//   }

//   return acc;
// }, []);

const adminSliderRoutes = adminPaths.reduce((acc, item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: "NavLink",
    });
  } else if (item.children) {
    acc.push({
      key: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: "NavLink",
      })),
    });
  }
  return acc;
}, []);
console.log(JSON.stringify(adminSliderRoutes));
