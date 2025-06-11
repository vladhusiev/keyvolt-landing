import Image from 'next/image'
import React from 'react'
import styles from './HeroCard.module.css'

interface HeroCardProps {
	icon: string
	children: React.ReactNode
}

const HeroCard: React.FC<HeroCardProps> = ({ icon, children }) => {
	const BASE_URL = 'http://localhost:1337'
	const imageUrl = `${BASE_URL}${icon}`

	return (
		<div className={styles.card}>
			<div className={styles.icon}>
				<Image src={imageUrl} alt="icon" width={32} height={32} />
			</div>
			<div className={styles.text}>{children}</div>
		</div>
	)
}

export default HeroCard
