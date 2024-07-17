import { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export interface ILoginFormInputs {
  userId: string;
  password: string;
}

export interface IFormConfig {
  defaultValues?: ILoginFormInputs;
  resolver?: any;
}

export interface IPHFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  defaultValues?: ILoginFormInputs;
  resolver?: any;
}

export interface IPhInput {
  type: string;
  name: string;
  label?: string;
}

export interface TLabelProps {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
}
