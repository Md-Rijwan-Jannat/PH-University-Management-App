import { z } from "zod";

export const semesterRegistrationSchema = z.object({
  academicSemester: z.string({
    required_error: "Academic semester is required",
  }),
  status: z
    .string({
      required_error: "Status is required",
    })
    .min(1, "Status is required")
    .max(50, "Status must be less than 50 characters"),
  minCredits: z
    .string({
      required_error: "Minimum credits are required",
    })
    .min(0, "Minimum credits must be 0 or more"),
  maxCredits: z
    .string({
      required_error: "Maximum credits are required",
    })
    .min(0, "Maximum credits must be 0 or more"),
});
