import { ComponentProps } from "react";

export const Button = (props: ComponentProps<"button">) => {
  const { children, ...otherProps } = props;
  return (
    <button className="rounded border border-gray-300 px-1" {...otherProps}>
      {children}
    </button>
  );
};
