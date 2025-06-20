import Container from "@/app/components/container/container";
import Button from "@/app/components/custom/Button/button";
import HeroCard from "@/app/components/custom/HeroCard/heroCard";
import Navbar from "../../components/navbar/navbar";
import styles from "./hero.module.css";
import { HeroData } from "@/app/hooks/useData";

interface HeroProps {
  heroContent: HeroData;
}

const Hero: React.FC<HeroProps> = ({ heroContent }) => {
  const { hero_title, hero_description, hero_btn_name, features } = heroContent;

  return (
    <section className={styles.hero}>
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
            <HeroCard key={f.id} icon={f.icon.url}>
              {f.text}
            </HeroCard>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
