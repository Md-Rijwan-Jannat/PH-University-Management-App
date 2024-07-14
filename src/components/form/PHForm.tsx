import { FormProvider, useForm } from "react-hook-form";
import { IFormConfig, IPHFormProps } from "./types";

const PHForm = ({ onSubmit, children, defaultValues }: IPHFormProps) => {
  const formConfig: IFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #ffc7ca",
          borderRadius: "8px",
          padding: "24px",
        }}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default PHForm;
