import Image from 'next/image'
import React from 'react'
import styles from './HeroCard.module.css'

interface HeroCardProps {
	icon: string
	children: React.ReactNode
}

const HeroCard: React.FC<HeroCardProps> = ({ icon, children }) => {
	return (
		<div className={styles.card}>
			<div className={styles.icon}>
				<Image src={icon} alt="icon" width={32} height={32} />
			</div>
			<div className={styles.text}>{children}</div>
		</div>
	)
}

export default HeroCard
