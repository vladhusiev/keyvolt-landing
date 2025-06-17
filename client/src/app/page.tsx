import Cases from "@/app/sections/cases/cases";
import Footer from "@/app/sections/footer/footer";
import Hero from "@/app/sections/hero/hero";
import Map from "@/app/sections/map/map";
import Principles from "@/app/sections/principles/principles";
import SolarCalculator from "@/app/sections/solar-calculator/solar-calculator";
import Solutions from "@/app/sections/solutions/solutions";
import About from "./sections/about/about";
import Contacts from "./sections/contacts/contacts";
import { StructuredData } from "@/app/components/seo/StructuredData";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="main-content" className={styles.main} role="main">
        <Hero />
        <Solutions />
        <Principles />
        <SolarCalculator />
        <Cases />
        <About />
        <Contacts />
        <Map />
      </main>
      <Footer />
    </>
  );
}
