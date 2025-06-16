import Container from "@/app/components/container/container";
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__content}>
          <div className={styles.footer__logo}>
            <Link href="/" className={styles.footer__logoImage}>
              <Image src="/images/logo.svg" alt="logo" width={130} height={50} />
            </Link>
            <p className={styles.footer__logoText}>Ваш партнер з енергетичної незалежності</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
