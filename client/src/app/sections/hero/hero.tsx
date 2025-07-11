"use client";

import Container from "@/app/components/container/container";
import Button from "@/app/components/custom/Button/button";
import HeroCard from "@/app/components/custom/HeroCard/heroCard";
import { HeroData } from "@/app/hooks/useData";
import { getOptimizedImageUrl } from "@/app/utlis/image-optimization";
import Navbar from "../../components/navbar/navbar";
import styles from "./hero.module.css";
import Image from "next/image";

interface HeroProps {
  heroContent: HeroData;
}

const Hero: React.FC<HeroProps> = ({ heroContent }) => {
  const { hero_title, hero_description, hero_btn_name, features } = heroContent;

  return (
    <section className={styles.hero}>
      <Image className={styles.heroImage} src="/images/hero.png" alt="Hero" fill priority quality={90} />
      <Navbar />
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>{hero_title}</h1>
          <p className={styles.description}>{hero_description}</p>
          <div className={styles.buttonContainer}>
            <Button
              arrow={true}
              onClick={() => {
                const el = document.getElementById("contacts");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {hero_btn_name}
            </Button>
          </div>
        </div>
        <div className={styles.featuresRow}>
          {features.map((f) => (
            <HeroCard
              key={f.id}
              icon={getOptimizedImageUrl(f.icon.url, {
                width: 32,
                height: 32,
                quality: 90,
              })}
            >
              {f.text}
            </HeroCard>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
