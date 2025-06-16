'use client'

import Principles from '@/app/sections/principles/principles'
import SolarCalculator from '@/app/sections/solar-calculator/solar-calculator'
import Solutions from '@/app/sections/solutions/solutions'
import styles from './page.module.css'
import Hero from './sections/hero/hero'
import Footer from './sections/footer/footer'
export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<Solutions />
			<Principles />
			<SolarCalculator />
			<Footer />
		</main>
	)
}
