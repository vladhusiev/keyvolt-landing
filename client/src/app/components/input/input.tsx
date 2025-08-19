import clsx from "clsx";
import styles from "./input.module.css";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, placeholder, value, onChange, name, id, ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={clsx(styles.input, className)}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
