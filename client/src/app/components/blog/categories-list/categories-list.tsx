import Link from "next/link";
import styles from "./categories-list.module.css";
import clsx from "clsx";
import { BlogCategory } from "@/app/types/blog";

interface CategoriesListProps {
  categories: BlogCategory[];
  activeCategory?: string;
}

const CategoriesList: React.FC<CategoriesListProps> = async ({
  categories,
  activeCategory,
}) => {
  return (
    <div className={styles.blogCategories}>
      <Link
        href="/blog"
        className={clsx(
          styles.blogCategoryItem,
          !activeCategory && styles.blogCategoryItemActive
        )}
      >
        Всі статті
      </Link>

      {categories.map((cat) => {
        const isActive = cat.slug === activeCategory;

        return (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className={clsx(
              styles.blogCategoryItem,
              isActive && styles.blogCategoryItemActive
            )}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesList;
