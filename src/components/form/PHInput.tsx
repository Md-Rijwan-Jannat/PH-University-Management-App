import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { IPhInput } from "./types";

const PHInput = ({ type, name, label }: IPhInput) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} className="custom-input" />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
