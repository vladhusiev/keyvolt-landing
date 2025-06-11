'use client'

import styles from './page.module.css'
import Features from './sections/features/features'
import Hero from './sections/hero/hero'

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<Features />
		</main>
	)
}
