import { Input } from "antd";
import { Controller } from "react-hook-form";
import { IPhInput } from "./types";

const PHInput = ({ type, name, label }: IPhInput) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <p style={{ color: "#661c1f", marginBottom: "4px", fontWeight: "bold" }}>
        {label ? label : null}
      </p>
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            id={name}
            className="custom-input"
            color="#661c1f"
          />
        )}
      />
    </div>
  );
};

export default PHInput;
