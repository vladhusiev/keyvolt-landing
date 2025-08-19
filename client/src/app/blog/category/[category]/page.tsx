import Container from "../../../components/container/container";
import Title from "../../../components/custom/Title/title";
import styles from "../../page.module.css";
import {
  getPostsByCategory,
  getCategoryBySlug,
  getAllCategories,
} from "../../../lib/blog-data";
import {
  filterPosts,
  paginate,
  sortPostsByDateDesc,
} from "../../../lib/blog-utils";
import { BLOG_CONFIG } from "../../../lib/blog-constants";
import BlogTopBar from "@/app/components/blog/blog-top-bar/blog-top-bar";
import BlogPagination from "@/app/components/blog/blog-pagination/blog-pagination";
import BlogGrid from "@/app/components/blog/blog-grid/blog-grid";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../sections/footer/footer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      category: category.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch categories for static generation:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Категорія не знайдена | KeyVolt Energy Блог",
      description: "Запитувана категорія блогу не існує",
    };
  }

  return {
    title: `${category.name} | KeyVolt Energy Блог`,
    description: `Категорія: ${category.name} | Блог KeyVolt Energy про сонячну енергетику, наші проекти, новини та інше`,
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: CategoryPageProps & {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category: categorySlug } = await params;
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const pageParam = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
  const perPage = BLOG_CONFIG.POSTS_PER_PAGE;

  const category = await getCategoryBySlug(categorySlug);
  const categories = await getAllCategories();

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(categorySlug);
  const filtered = filterPosts(sortPostsByDateDesc(posts), q);
  const p = paginate(filtered, pageParam, perPage);
  const hasNoPosts = posts.length === 0;

  return (
    <main className={styles.blogMain}>
      <Navbar />
      <section className={styles.blogSection}>
        <Container>
          <Title>Блог</Title>

          <BlogTopBar
            categories={categories}
            activeCategory={categorySlug}
            searchQuery={q}
            searchBaseHref={`/blog/category/${categorySlug}`}
          />

          {hasNoPosts ? (
            <div className={styles.emptyCategory}>
              <h3 className={styles.emptyCategoryTitle}>
                Поки що немає статей у категорії "{category.name}"
              </h3>
              <p className={styles.emptyCategoryDescription}>
                Незабаром ми додамо цікаві матеріали. Перегляньте інші категорії
                або скористайтеся пошуком.
              </p>
            </div>
          ) : (
            <>
              <BlogGrid
                posts={p.items}
                categorySlug={categorySlug}
                searchQuery={q}
              />
              <BlogPagination
                totalPages={p.totalPages}
                currentPage={p.page}
                baseHref={`/blog/category/${categorySlug}`}
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
