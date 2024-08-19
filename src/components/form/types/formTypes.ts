import { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export type TLoginFormInputs = {
  userId: string;
  password: string;
};

export type IFormConfig = {
  defaultValues?: TLoginFormInputs;
  resolver?: any;
};

export type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

export type TPHFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

export type TPhInput = {
  type: string;
  name: string;
  label?: string;
  placeholder: string;
};

export type TLabelProps = {
  label: string;
  name: string;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export type TPHDatePicker = {
  name: string;
  label: string;
};
