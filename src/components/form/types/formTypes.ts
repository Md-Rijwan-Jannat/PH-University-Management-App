import { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export interface ILoginFormInputs {
  userId: string;
  password: string;
}

export interface IFormConfig {
  defaultValues?: ILoginFormInputs;
}

export interface IPHFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  defaultValues?: ILoginFormInputs;
}

export interface IPhInput {
  type: string;
  name: string;
  label?: string;
}
