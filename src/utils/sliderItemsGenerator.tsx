import { NavLink } from "react-router-dom";
import { ISliderRoute, IUserPath } from "../types";

export const sliderItemsGenerator = (items: IUserPath[], role: string) => {
  const adminSliderRoutes = items.reduce((acc: ISliderRoute[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    } else if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  }, []);
  return adminSliderRoutes;
};
