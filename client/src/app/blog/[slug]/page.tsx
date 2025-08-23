import Container from "../../components/container/container";
import Image from "next/image";
import styles from "./page.module.css";
import { getPostBySlug, getAllPosts } from "../../lib/blog-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../sections/footer/footer";
import Title from "@/app/components/custom/Title/title";
import DOMPurify from "isomorphic-dompurify";
import Breadcrumb, {
  BreadcrumbItem,
} from "../../components/breadcrumb/breadcrumb";
import BlogCard from "@/app/components/blog/blog-card/blog-card";
import { seoConfig, generateCanonicalUrl } from "../../lib/seo-config";
import { ArticleStructuredData } from "../../components/seo/ArticleStructuredData";

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
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      siteName: seoConfig.siteName,
      url: generateCanonicalUrl(`/blog/${slug}`),
      images: [post.thumbnail],
      publishedTime: post.date,
      authors: [seoConfig.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.thumbnail || seoConfig.defaultTwitterImage],
    },
    alternates: {
      canonical: generateCanonicalUrl(`/blog/${slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const sanitizedContent = DOMPurify.sanitize(post?.content || "");
  const breadcrumbItems: BreadcrumbItem[] = [{ label: "Блог", href: "/blog" }];

  if (!post) {
    notFound();
  }

  if (post.category) {
    breadcrumbItems.push({
      label: post.category.name,
      href: `/blog/category/${post.category.slug}`,
    });
  }

  return (
    <main>
      <Navbar />
      <article className={styles.postArticle}>
        <Container>
          <Breadcrumb
            className={styles.postArticleBreadcrumb}
            items={breadcrumbItems}
          />
          <header className={styles.postArticleHeader}>
            <Title tag="h1" className={styles.postArticleTitle}>
              {post.title}
            </Title>
            <p className={styles.postArticleDescription}>{post.description}</p>
            <time
              className={styles.postArticleDate}
              dateTime={new Date(post.date).toISOString()}
            >
              {new Date(post.date).toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </header>
          <ArticleStructuredData
            url={generateCanonicalUrl(`/blog/${post.slug}`)}
            title={post.title}
            description={post.description}
            image={post.thumbnail}
            datePublished={post.date}
            dateModified={post.date}
            authorName={seoConfig.author}
            publisherName={seoConfig.siteName}
            breadcrumbs={breadcrumbItems.map((b) => ({
              name: b.label,
              item: b.href
                ? generateCanonicalUrl(b.href)
                : generateCanonicalUrl(`/blog/${post.slug}`),
            }))}
          />
          {post.thumbnail && (
            <div className={styles.postArticleCover}>
              <Image
                width={1024}
                height={576}
                style={{ width: "100%", height: "100%" }}
                src={post.thumbnail}
                alt={post.title}
              />
            </div>
          )}
          <div className={styles.postArticleContent}>
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </Container>
      </article>
      {post.relatedArticles.length > 0 && (
        <Container>
          <section className={styles.postArticleRelated}>
            <Title
              tag="h3"
              className={styles.postArticleRelatedTitle}
              decorator={false}
            >
              Схожі статті
            </Title>
            <ul className={styles.postArticleRelatedList}>
              {post.relatedArticles.map((article) => (
                <BlogCard
                  className={styles.postArticleRelatedItem}
                  key={article.id}
                  post={article}
                  as="li"
                />
              ))}
            </ul>
          </section>
        </Container>
      )}
      <Footer />
    </main>
  );
}
