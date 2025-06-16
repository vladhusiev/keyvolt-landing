import Image from 'next/image'
import React from 'react'
import styles from './heroCard.module.css'

interface HeroCardProps {
	icon: string
	children: React.ReactNode
}

const HeroCard: React.FC<HeroCardProps> = ({ icon, children }) => {
	const url = new URL(icon, process.env.NEXT_PUBLIC_STRAPI_URL).toString()
	return (
		<div className={styles.card}>
			<div className={styles.icon}>
				<Image src={url} alt="icon" width={32} height={32} />
			</div>
			<div className={styles.text}>{children}</div>
		</div>
	)
}

export default HeroCard
