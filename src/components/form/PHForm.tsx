import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Form } from "antd";
import { TFormConfig, TPHFormProps } from "./types";

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TPHFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #cccccc",
          borderRadius: "8px",
          padding: "24px",
          width: "100%",
          height: "100%",
          margin: "0 auto",
        }}
        onFinish={methods.handleSubmit(submit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
