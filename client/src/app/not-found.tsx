import Link from "next/link";
import Container from "./components/container/container";
import Button from "./components/custom/Button/button";
import Navbar from "./components/navbar/navbar";
import Footer from "./sections/footer/footer";
import styles from "./not-found.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінку не знайдено | KeyVolt Energy",
  description:
    "Сторінка не існує або була переміщена. Перейдіть на головну сторінку або до нашого блогу.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.notFoundMain}>
        <Container>
          <div className={styles.notFoundContent}>
            <div className={styles.notFoundNumber}>404</div>
            <h1 className={styles.notFoundTitle}>Сторінку не знайдено</h1>
            <p className={styles.notFoundDescription}>
              На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
              Перевірте правильність URL-адреси або скористайтеся навігацією для
              пошуку потрібної інформації.
            </p>
            <div className={styles.notFoundActions}>
              <Link href="/">
                <Button variant="primary">На головну</Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
