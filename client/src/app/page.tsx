'use client'

import Solutions from '@/app/sections/solutions/solutions'
import styles from './page.module.css'
import Hero from './sections/hero/hero'

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<Solutions />
		</main>
	)
}
