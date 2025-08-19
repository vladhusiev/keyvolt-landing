import Link from "next/link";
import { buildQueryString } from "@/app/lib/blog-utils";
import styles from "./blog-pagination.module.css";
import clsx from "clsx";

interface BlogPaginationProps {
  totalPages: number;
  currentPage: number;
  baseHref: string;
  searchQuery?: string;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  totalPages,
  currentPage,
  baseHref,
  searchQuery,
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNum = idx + 1;
        const isActive = pageNum === currentPage;
        const href =
          baseHref +
          buildQueryString({
            q: searchQuery || undefined,
            page: pageNum === 1 ? undefined : pageNum,
          });

        return (
          <Link
            key={pageNum}
            href={href}
            className={clsx(
              styles.paginationItem,
              isActive && styles.paginationItemActive
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNum}
          </Link>
        );
      })}
    </nav>
  );
};

export default BlogPagination;
