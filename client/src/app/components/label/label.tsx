import clsx from "clsx";
import styles from "./label.module.css";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: React.ReactNode;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ className, children, htmlFor, ...props }) => {
  return (
    <label className={clsx(styles.label, className)} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

export default Label;
