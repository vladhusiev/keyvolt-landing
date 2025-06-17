"use client";

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
import { useData } from "./hooks/useData";
import { useMemo } from "react";
import Preloader from "@/app/components/preloader/preloader";
import { HeroData, SolutionsData } from "./hooks/useData";
export default function Home() {
  const { data, isLoading } = useData();
  const heroData: HeroData = useMemo(() => {
    return {
      hero_title: data?.hero_title || "",
      hero_description: data?.hero_description || "",
      hero_btn_name: data?.hero_btn_name || "",
      features: data?.features || [],
    };
  }, [data]);

  const solutionsData: SolutionsData[] = useMemo(() => {
    return data?.solutions || [];
  }, [data]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <StructuredData />
      <main id="main-content" className={styles.main} role="main">
        {heroData && <Hero heroContent={heroData} />}
        {solutionsData && <Solutions solutionsContent={solutionsData} />}
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
