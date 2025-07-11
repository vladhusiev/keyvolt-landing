import { StructuredData } from "@/app/components/seo/StructuredData";
import Cases from "@/app/sections/cases/cases";
import Footer from "@/app/sections/footer/footer";
import Hero from "@/app/sections/hero/hero";
import Map from "@/app/sections/map/map";
import Principles from "@/app/sections/principles/principles";
import SolarCalculator from "@/app/sections/solar-calculator/solar-calculator";
import Solutions from "@/app/sections/solutions/solutions";
import styles from "./page.module.css";
import About from "./sections/about/about";
import Contacts from "./sections/contacts/contacts";
import { getServerData } from "./lib/data";

export default async function Home() {
  const data = await getServerData();
  const { heroData, solutionsData, principlesData, casesData, aboutData } = data;

  return (
    <>
      <StructuredData />
      <main id="main-content" className={styles.main} role="main">
        {heroData && <Hero heroContent={heroData} />}
        {solutionsData && <Solutions solutionsContent={solutionsData} />}
        {principlesData && <Principles principlesContent={principlesData} />}
        <SolarCalculator />
        {casesData && <Cases casesContent={casesData} />}
        {aboutData && <About aboutContent={aboutData} />}
        <Contacts />
        <Map />
      </main>
      <Footer />
    </>
  );
}
