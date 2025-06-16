'use client'

import Cases from '@/app/sections/cases/cases'
import Footer from '@/app/sections/footer/footer'
import Hero from '@/app/sections/hero/hero'
import Map from '@/app/sections/map/map'
import Principles from '@/app/sections/principles/principles'
import SolarCalculator from '@/app/sections/solar-calculator/solar-calculator'
import Solutions from '@/app/sections/solutions/solutions'
import styles from './page.module.css'
import About from './sections/about/about'
import Contacts from './sections/contacts/contacts'

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<Solutions />
			<Principles />
			<SolarCalculator />
			<Cases />
			<About />
			<Contacts />
			<Map />
			<Footer />
		</main>
	)
}
