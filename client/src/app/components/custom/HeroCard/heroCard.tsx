import React from 'react'
import styles from './HeroCard.module.css'

interface HeroCardProps {
	icon: React.ReactNode
	children: React.ReactNode
}

const HeroCard: React.FC<HeroCardProps> = ({ icon, children }) => (
	<div className={styles.card}>
		<div className={styles.icon}>{icon}</div>
		<div className={styles.text}>{children}</div>
	</div>
)

export default HeroCard
