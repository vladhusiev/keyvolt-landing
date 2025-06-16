"use client";

import Principles from "@/app/sections/principles/principles";
import SolarCalculator from "@/app/sections/solar-calculator/solar-calculator";
import Solutions from "@/app/sections/solutions/solutions";
import styles from "./page.module.css";
import Hero from "@/app/sections/hero/hero";
import Footer from "@/app/sections/footer/footer";
import Map from "@/app/sections/map/map";
import Contacts from "./sections/contacts/contacts";
import About from "./sections/about/about";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Solutions />
      <Principles />
      <SolarCalculator />
      <About />
      <Contacts />
      <Map />
      <Footer />
    </main>
  );
}
