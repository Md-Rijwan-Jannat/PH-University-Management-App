import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { TPhInput } from "./types";

const PHInput = ({ type, name, label, placeholder, disabled }: TPhInput) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              className="custom-input"
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
