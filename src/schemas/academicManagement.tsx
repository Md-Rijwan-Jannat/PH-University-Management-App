import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a name" }),
  year: z.string({ required_error: "Please select a year" }),
  startMonth: z.string({ required_error: "Please select a start month" }),
  endMonth: z.string({ required_error: "Please select a end month" }),
});

export const academicFacultySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
});

export const academicDepartmentSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  academicFaculty: z.string({
    required_error: "Please select a academic faculty",
  }),
});
