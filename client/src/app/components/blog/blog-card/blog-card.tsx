import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/app/types/blog";
import styles from "./blog-card.module.css";
import clsx from "clsx";

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured = false }) => {
  return (
    <article className={clsx(styles.card, isFeatured && styles.cardFeatured)}>
      <Link href={`/blog/${post.slug}`}>
        <div className={styles.cardCover}>
          <Image
            src={post.coverImage}
            alt={post.title}
            className={styles.cardCoverImage}
            width={1024}
            height={576}
          />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          <span className={styles.cardDate}>
            {new Date(post.date).toLocaleDateString("uk-UA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {isFeatured && (
            <p className={styles.cardDescription}>{post.description}</p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
