import { ComponentProps } from "react";

export const Input = (props: ComponentProps<"input">) => {
  const { children, ...otherProps } = props;
  return (
    <input className="mx-1 rounded border border-gray-300" {...otherProps} />
  );
};
