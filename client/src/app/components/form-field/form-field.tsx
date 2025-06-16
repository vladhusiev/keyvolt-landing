import clsx from "clsx";
import styles from "./form-field.module.css";

interface FormFieldProps {
  className?: string;
  children: React.ReactNode;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ className, children, error, ...props }) => {
  return (
    <div className={clsx(styles.formField, className)} {...props}>
      {children}

      {error && <p className={styles.formField__error}>{error}</p>}
    </div>
  );
};

export default FormField;
