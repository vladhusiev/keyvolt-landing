'use client'

import Principles from '@/app/sections/principles/principles'
import SolarCalculator from '@/app/sections/solar-calculator/solar-calculator'
import Solutions from '@/app/sections/solutions/solutions'
import styles from './page.module.css'
import Hero from './sections/hero/hero'

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<Solutions />
			<Principles />
			<SolarCalculator />
		</main>
	)
}
