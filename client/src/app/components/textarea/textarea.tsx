import clsx from "clsx";
import styles from "./textarea.module.css";
import React from "react";

interface TextareaProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, value, name, id, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(styles.textarea, className)}
        placeholder={placeholder}
        value={value}
        name={name}
        id={id}
        rows={3}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
