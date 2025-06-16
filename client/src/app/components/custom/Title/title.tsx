import Image from "next/image";
import styles from "./title.module.css";
import clsx from "clsx";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  decorator?: boolean;
}

const Title: React.FC<TitleProps> = ({ children, decorator = true, className }) => {
  return (
    <div className={clsx(styles.titleWrap)}>
      {decorator && (
        <span className={styles.titleLine}>
          <Image src={"/images/icons/zap.svg"} alt="" width={24} height={24} />
        </span>
      )}
      <h2 className={clsx(styles.title, className)}>{children}</h2>
    </div>
  );
};

export default Title;
