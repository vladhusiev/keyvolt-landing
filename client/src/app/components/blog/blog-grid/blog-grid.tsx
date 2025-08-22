"use client";

import BlogCard from "../blog-card/blog-card";
import { BlogPost } from "@/app/types/blog";
import styles from "./blog-grid.module.css";
import Button from "../../custom/Button/button";
import { useRouter } from "next/navigation";

interface BlogGridProps {
  posts: BlogPost[];
  searchQuery?: string;
  categorySlug?: string;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  searchQuery,
  categorySlug,
}) => {
  const router = useRouter();

  const handleClearSearch = () => {
    router.push(categorySlug ? `/blog/category/${categorySlug}` : "/blog");
  };

  if (posts.length === 0 && searchQuery) {
    return (
      <div className={styles.blogGridEmpty}>
        <p className={styles.blogGridEmptyText}>Статті не знайдено</p>
        <Button variant="altLight" onClick={handleClearSearch}>
          Очистити пошук
        </Button>
      </div>
    );
  }

  const featuredPosts = posts.slice(0, 2);
  const regularPosts = posts.slice(2);

  return (
    <div className={styles.blogGrid}>
      {featuredPosts.length > 0 && (
        <div className={styles.blogPostsFeatured}>
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} isFeatured />
          ))}
        </div>
      )}
      {regularPosts.length > 0 && (
        <div className={styles.blogPostsRegular}>
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
