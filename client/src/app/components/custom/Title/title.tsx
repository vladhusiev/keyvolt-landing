import React from "react";
import { getOptimizedImageUrl } from "@/app/utlis/image-optimization";
import clsx from "clsx";
import Image from "next/image";
import styles from "./title.module.css";

interface TitleProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  decorator?: boolean;
}

const Title: React.FC<TitleProps> = ({
  tag = "h2",
  children,
  decorator = true,
  className,
}) => {
  return (
    <div className={clsx(styles.titleWrap)}>
      {decorator && (
        <span className={styles.titleLine}>
          <Image
            src={getOptimizedImageUrl("/images/icons/zap.svg", {
              width: 24,
              height: 24,
              quality: 90,
            })}
            alt=""
            width={24}
            height={24}
          />
        </span>
      )}
      {React.createElement(
        tag,
        { className: clsx(styles.title, styles[`title__${tag}`], className) },
        children
      )}
    </div>
  );
};

export default Title;
