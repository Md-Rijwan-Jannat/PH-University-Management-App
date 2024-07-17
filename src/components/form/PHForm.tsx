import { FormProvider, useForm } from "react-hook-form";
import { IFormConfig, IPHFormProps } from "./types";
import { Form } from "antd";

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: IPHFormProps) => {
  const formConfig: IFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #cccccc",
          borderRadius: "8px",
          padding: "24px",
        }}
        onFinish={methods.handleSubmit(onSubmit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
