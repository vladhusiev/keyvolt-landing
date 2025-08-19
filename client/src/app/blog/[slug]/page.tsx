import Container from "../../components/container/container";
import Image from "next/image";
import styles from "./page.module.css";
import { getPostBySlug, getAllPosts } from "../../lib/blog-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../sections/footer/footer";
import Title from "@/app/components/custom/Title/title";
import { MarkdownRenderer } from "@/app/components/markdown-renderer/markdown-renderer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch posts for static generation:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Статтю не знайдено | KeyVolt Energy Блог",
      description: "Запитувана стаття блогу не існує",
    };
  }

  return {
    title: `${post.title} | KeyVolt Energy Блог`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      siteName: "KeyVolt Energy",
      images: [post.coverImage],
      publishedTime: post.date,
      authors: ["KeyVolt Energy"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <article className={styles.postArticle}>
        <Container>
          <header className={styles.postArticleHeader}>
            <Title tag="h1" className={styles.postArticleTitle}>
              {post.title}
            </Title>
            <p className={styles.postArticleDescription}>{post.description}</p>
            <span className={styles.postArticleDate}>
              {new Date(post.date).toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </header>
          <div className={styles.postArticleCover}>
            <Image
              width={1024}
              height={576}
              style={{ width: "100%", height: "100%" }}
              src={post.coverImage}
              alt={post.title}
            />
          </div>
          <div className={styles.postArticleContent}>
            <MarkdownRenderer content={post.content} />
          </div>
        </Container>
      </article>
      <Footer />
    </main>
  );
}
