'use client'

import Benefits from './components/benefits/benefits'
import Contact from './components/contact/contact'
import Features from './components/features/features'
import Hero from './components/hero/hero'
import Calculator from './components/solar-calculator/solar-calculator'
import Testimonials from './components/testimonials/testimonials'
import styles from './page.module.css'

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<Features />
			<Calculator />
			<Benefits />
			<Testimonials />
			<Contact />
		</main>
	)
}
