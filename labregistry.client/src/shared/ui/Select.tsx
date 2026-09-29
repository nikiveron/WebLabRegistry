import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      className={`select ${className}`}
      {...props}
    />
  );
}