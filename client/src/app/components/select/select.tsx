import clsx from "clsx";
import styles from "./select.module.css";
import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
  options: Option[];
}

interface Option {
  value: string;
  label: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, value, onChange, name, id, options, ...props }, ref) => {
    return (
      <div className={styles.selectContainer}>
        <select
          ref={ref}
          className={clsx(styles.select, className)}
          value={value}
          onChange={onChange}
          name={name}
          id={id}
          {...props}
        >
          {options.map((option: Option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className={styles.selectIcon}>
          <ChevronDown width={20} height={20} />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
