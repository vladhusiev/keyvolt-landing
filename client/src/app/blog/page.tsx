import Container from "../components/container/container";
import Title from "../components/custom/Title/title";
import styles from "./page.module.css";
import { filterPosts, paginate, sortPostsByDateDesc } from "../lib/blog-utils";
import { BLOG_CONFIG } from "../lib/blog-constants";
import BlogTopBar from "@/app/components/blog/blog-top-bar/blog-top-bar";
import BlogPagination from "@/app/components/blog/blog-pagination/blog-pagination";
import BlogGrid from "@/app/components/blog/blog-grid/blog-grid";
import Navbar from "../components/navbar/navbar";
import Footer from "../sections/footer/footer";
import { getAllCategories, getAllPosts } from "../lib/blog-data";
import type { Metadata } from "next";
import { seoConfig, generateCanonicalUrl } from "../lib/seo-config";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Блог | KeyVolt Energy";
  const description =
    "Блог KeyVolt Energy про сонячну енергетику, наші проекти, новини та інше";
  const canonical = generateCanonicalUrl("/blog");

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      images: [
        {
          url: seoConfig.defaultOGImage,
          width: 1200,
          height: 630,
          alt: `${seoConfig.siteName} - ${description}`,
        },
      ],
      type: "website",
      locale: "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoConfig.defaultTwitterImage],
    },
  };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const pageParam = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
  const perPage = BLOG_CONFIG.POSTS_PER_PAGE;
  const activeCategory =
    typeof sp.category === "string" ? sp.category : undefined;

  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const filtered = filterPosts(sortPostsByDateDesc(posts), q);
  const p = paginate(filtered, pageParam, perPage);
  const hasNoPosts = posts.length === 0;

  return (
    <main className={styles.blogMain}>
      <Navbar />
      <section className={styles.blogSection}>
        <Container>
          <Title tag="h1">Блог</Title>
          <BlogTopBar
            categories={categories}
            searchQuery={q}
            searchBaseHref="/blog"
          />

          {hasNoPosts ? (
            <div className={styles.emptyCategory}>
              <h3 className={styles.emptyCategoryTitle}>
                Поки що немає статей
              </h3>
              <p className={styles.emptyCategoryDescription}>
                Незабаром ми додамо цікаві матеріали. Зачекайте трохи!
              </p>
            </div>
          ) : (
            <>
              <BlogGrid
                posts={p.items}
                searchQuery={q}
                categorySlug={activeCategory}
              />
              <BlogPagination
                totalPages={p.totalPages}
                currentPage={p.page}
                baseHref="/blog"
                searchQuery={q}
              />
            </>
          )}
        </Container>
      </section>
      <Footer />
    </main>
  );
}
