const months = [
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

export const monthsOptions = months.map((item) => ({
  value: item,
  label: item,
}));

const currentDate = new Date().getFullYear();

export const yearOptions = [0, 1, 2, 3, 4, 5, 6].map((item) => ({
  value: String(currentDate + item),
  label: String(currentDate + item),
}));
