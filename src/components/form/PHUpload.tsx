import { Form, Input } from "antd";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TPHUploadProps = {
  name: string;
  label: string;
};

const PHUpload: FC<TPHUploadProps> = ({ name, label }) => {
  const { setValue } = useFormContext();

  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value, ref, ...field },
        fieldState: { error },
      }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          onChange(file);
          setValue(name, file); // Update the form value with the selected file
        };

        return (
          <Form.Item
            label={label}
            help={error?.message}
            validateStatus={error ? "error" : ""}
          >
            <Input
              id={name}
              value={value?.fileName}
              type="file"
              {...field}
              onChange={handleFileChange}
              ref={ref}
            />
          </Form.Item>
        );
      }}
    />
  );
};

export default PHUpload;
