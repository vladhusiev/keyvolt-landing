import Link from "next/link";
import styles from "./breadcrumb.module.css";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={clsx(styles.breadcrumb, className)} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {item.href ? (
              <Link href={item.href} className={styles.breadcrumbLink}>
                {index === 0 && (
                  <ArrowLeft size={16} className={styles.breadcrumbLinkArrow} />
                )}
                {item.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbCurrent} aria-current="page">
                {index === 0 && (
                  <ArrowLeft size={16} className={styles.breadcrumbLinkArrow} />
                )}
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className={styles.breadcrumbSeparator} aria-hidden="true">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
