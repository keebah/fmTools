import { ComponentProps } from "react";

import { cn } from "../features/utils/tailwind";

export const Button = (props: ComponentProps<"button">) => {
  const { children, disabled, ...otherProps } = props;
  return (
    <button
      className={cn(
        "rounded border border-gray-300 px-1",
        disabled && "text-gray-400"
      )}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
