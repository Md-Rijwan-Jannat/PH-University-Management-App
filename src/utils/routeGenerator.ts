import { IRoute, IUserPath } from "../types";

const routeGenerator = (items: IUserPath[]) => {
  const router = items.reduce((acc: IRoute[], item) => {
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

  return router;
};

export const RouterGenerator = routeGenerator;
