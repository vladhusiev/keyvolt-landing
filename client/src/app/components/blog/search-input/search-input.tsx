"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildQueryString } from "@/app/lib/blog-utils";
import styles from "./search-input.module.css";
import Input from "../../input/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  defaultQuery?: string;
  placeholder: string;
  baseHref: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  defaultQuery = "",
  placeholder,
  baseHref,
}) => {
  const [value, setValue] = useState(defaultQuery);
  const router = useRouter();

  useEffect(() => {
    setValue(defaultQuery);
  }, [defaultQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const href = baseHref + buildQueryString({ q: value || undefined });
      router.push(href);
    }, 350);
    return () => clearTimeout(timer);
  }, [value, baseHref, router]);

  return (
    <div className={styles.searchInputWrapper} role="search">
      <SearchIcon className={styles.searchInputIcon} size={20} />
      <Input
        className={styles.searchInput}
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
};

export default SearchInput;
