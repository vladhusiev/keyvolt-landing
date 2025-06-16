import Container from "@/app/components/container/container";
import Title from "@/app/components/custom/Title/title";

import styles from "./about.module.css";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <Container>
        <Title className={styles.about__title}>Про компанію</Title>
        <article className={styles.about__content}>
          <h3 className={styles.about__contentHeading}>
            Мета - створення <span className={styles.about__contentHeadingHighlight}>автономного</span> джерела
            електропостачання для підвищення енергетичної{" "}
            <span className={styles.about__contentHeadingHighlight}>незалежності</span> та{" "}
            <span className={styles.about__contentHeadingHighlight}>стабільності</span>.
          </h3>

          <p className={styles.about__contentText}>
            Lorem ipsum dolor sit amet consectetur. Pellentesque semper sit tortor sed fusce feugiat sit. Pellentesque
            semper sit tortor sed fusce feugiat sit.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur. Pellentesque semper sit tortor sed fusce feugiat sit. Pellentesque
            semper sit tortor sed fusce feugiat sit.
          </p>
        </article>

        <div className={styles.about__partners}>
          <Image className={styles.about__partner} src="/images/partner.png" alt="Partner 1" width={110} height={30} />
          <Image className={styles.about__partner} src="/images/partner.png" alt="Partner 1" width={110} height={30} />
          <Image className={styles.about__partner} src="/images/partner.png" alt="Partner 1" width={110} height={30} />
          <Image className={styles.about__partner} src="/images/partner.png" alt="Partner 1" width={110} height={30} />
        </div>
      </Container>
    </section>
  );
};

export default About;
