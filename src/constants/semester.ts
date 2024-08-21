import { MenuProps } from "antd";

export const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

export const statusOptions = [
  { value: "UPCOMING", label: "UPCOMING" },
  { value: "ONGOING", label: "ONGOING" },
  { value: "ENDED", label: "ENDED" },
];

export const items: MenuProps["items"] = [
  { key: "UPCOMING", label: "UPCOMING" },
  { key: "ONGOING", label: "ONGOING" },
  { key: "ENDED", label: "ENDED" },
];

export const daysOptions = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

export const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
