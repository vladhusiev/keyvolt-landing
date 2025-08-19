"use client";

import React from "react";
import styles from "./pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onChange,
}) => {
  if (totalPages <= 1) return null;
  return (
    <nav className={styles.container} aria-label="Pagination">
      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNum = idx + 1;
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            onClick={() => onChange(pageNum)}
            className={`${styles.pageLink} ${
              isActive ? styles.pageLinkActive : ""
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNum}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
