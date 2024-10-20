import { ComponentProps, useState } from "react";

type SelectProps = {
  onChange: (current: string, update: string) => void;
} & Omit<ComponentProps<"select">, "onChange">;

export const Select = (props: SelectProps) => {
  const [current, setCurrent] = useState<string>("");
  const { children, onChange, ...otherProps } = props;
  return (
    <select
      onChange={(e) => {
        setCurrent(e.target.value);
        onChange(current, e.target.value);
      }}
      {...otherProps}
      value={current}
    >
      <option></option>
      {current && <option value={current}>{current}</option>}
      {children}
    </select>
  );
};
