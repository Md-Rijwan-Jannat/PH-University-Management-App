import { NavLink } from "react-router-dom";
import { ISliderRoute, IUserPath } from "../types";

export const sliderItemsGenerator = (
  items: IUserPath[],
  role: string
): ISliderRoute[] => {
  const adminSliderRoutes = items.reduce((acc: ISliderRoute[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    } else if (item.name && item.children && item.children.length > 0) {
      const childrenRoutes = item.children
        .filter((child) => child.name && child.path)
        .map((child) => ({
          key: child.name!,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        }));

      if (childrenRoutes.length > 0) {
        acc.push({
          key: item.name,
          label: item.name,
          children: childrenRoutes,
        });
      }
    }
    return acc;
  }, [] as ISliderRoute[]);

  return adminSliderRoutes;
};
