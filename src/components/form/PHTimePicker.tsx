import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";
import { TPHDatePicker } from "./types";

const PHTimePicker = ({ name, label }: TPHDatePicker) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              id={name}
              className="custom-input"
              style={{ width: "100%" }}
              format="HH:mm"
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
