import { Form, Select } from "antd";
import { TLabelProps } from "./types";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TLabelProps) => {
  const { control } = useFormContext();
  const watchValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (onValueChange) {
      onValueChange(watchValue);
    }
  }, [onValueChange, watchValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            mode={mode}
            className="custom-input"
            style={{ width: "100%" }}
            options={options}
            onChange={(value) => field.onChange(value)}
            value={field.value}
            disabled={disabled}
          />
          {error && (
            <small style={{ color: "red", marginTop: "2px" }}>
              {error.message}
            </small>
          )}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;
