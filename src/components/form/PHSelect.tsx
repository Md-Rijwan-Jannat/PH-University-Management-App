import { Form, Select } from "antd";
import { TLabelProps } from "./types";
import { Controller } from "react-hook-form";

const PHSelect = ({ label, name, options }: TLabelProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            className="custom-input"
            style={{ width: "100%" }}
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
