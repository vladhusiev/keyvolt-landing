import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogPost } from "@/app/types/blog";
import styles from "./blog-card.module.css";
import clsx from "clsx";

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
  className?: string;
  as?: "li" | "div" | "article";
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  isFeatured = false,
  className,
  as = "article",
}) => {
  return React.createElement(
    as,
    {
      className: clsx(
        styles.card,
        isFeatured && styles.cardFeatured,
        className
      ),
    },
    <Link href={`/blog/${post.slug}`}>
      {post.thumbnail && (
        <div className={styles.cardCover}>
          <Image
            src={post.thumbnail}
            alt={post.title}
            className={styles.cardCoverImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <time
          className={styles.cardDate}
          dateTime={new Date(post.date).toISOString()}
        >
          {new Date(post.date).toLocaleDateString("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        {isFeatured && (
          <p className={styles.cardDescription}>{post.description}</p>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
