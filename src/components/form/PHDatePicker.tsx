import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import { TPHDatePicker } from "./types";

const PHDatePicker = ({ name, label }: TPHDatePicker) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              id={name}
              className="custom-input"
              style={{ width: "100%" }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
