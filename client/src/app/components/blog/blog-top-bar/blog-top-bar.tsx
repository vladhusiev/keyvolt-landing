import CategoriesList from "../categories-list/categories-list";
import SearchBar from "../search-input/search-input";
import styles from "./blog-top-bar.module.css";
import { BlogCategory } from "@/app/services/blog-service";

interface BlogTopBarProps {
  categories: BlogCategory[];
  activeCategory?: string;
  searchQuery?: string;
  searchPlaceholder?: string;
  searchBaseHref: string;
}

const BlogTopBar: React.FC<BlogTopBarProps> = ({
  categories,
  activeCategory,
  searchQuery = "",
  searchPlaceholder = "Пошук статей...",
  searchBaseHref,
}) => {
  return (
    <div className={styles.blogTopBar}>
      <CategoriesList categories={categories} activeCategory={activeCategory} />
      <SearchBar
        defaultQuery={searchQuery}
        placeholder={searchPlaceholder}
        baseHref={searchBaseHref}
      />
    </div>
  );
};

export default BlogTopBar;
