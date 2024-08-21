import { ReactNode } from "react";

export interface ISliderRoute {
  key: string;
  label: ReactNode;
  children?: ISliderRoute[];
}

export interface IRoute {
  path: string;
  element: ReactNode;
}

export interface IUserPath {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: IUserPath[];
}
