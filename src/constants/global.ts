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

const gander = ["male", "female", "other"];

export const ganderOptions = gander.map((item) => ({
  value: item,
  label: item,
}));

const religion = ["Islam", "Hindu", "Christian", "Buddhist", "Others"];

export const religionOptions = religion.map((item) => ({
  value: item,
  label: item,
}));

const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodGroupOptions = bloodGroup.map((item) => ({
  value: item,
  label: item,
}));

export const occupationOptions = [
  { label: "Lecturer", value: "Lecturer" },
  { label: "Assistant Professor", value: "Assistant Professor" },
  { label: "Associate Professor", value: "Associate Professor" },
  { label: "Professor", value: "Professor" },
  { label: "Head of Department", value: "Head of Department" },
  { label: "System Admin", value: "System Admin" },
  { label: "Registrar", value: "Registrar" },
  { label: "Dean", value: "Dean" },
  { label: "Chancellor", value: "Chancellor" },
  { label: "Vice-Chancellor", value: "Vice-Chancellor" },
];
