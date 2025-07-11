import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import Image from 'next/image'
import React from 'react'
import styles from './heroCard.module.css'

interface HeroCardProps {
	icon: string
	children: React.ReactNode
}

const HeroCard: React.FC<HeroCardProps> = ({ icon, children }) => {
	const optimizedIconUrl = getOptimizedImageUrl(icon, 32, 32, 90)

	return (
		<div className={styles.card}>
			<div className={styles.icon}>
				<Image
					src={optimizedIconUrl}
					alt="icon"
					width={32}
					height={32}
				/>
			</div>
			<div className={styles.text}>{children}</div>
		</div>
	)
}

export default HeroCard
