import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import Image from 'next/image'
import React from 'react'
import styles from './preloader.module.css'

const Preloader: React.FC = () => {
	return (
		<div className={styles.preloader}>
			<div className={styles.preloader__content}>
				<div className={styles.preloader__logoContainer}>
					<div className={styles.preloader__logo}>
						<Image
							src={getOptimizedImageUrl('/images/logo.svg', {
								width: 230,
								height: 80,
								quality: 90
							})}
							alt="KeyVolt Energy"
							width={230}
							height={80}
							priority
						/>
					</div>
				</div>

				<div className={styles.preloader__loadingBar}>
					<div className={styles.preloader__loadingBarProgress} />
				</div>

				<p className={styles.preloader__message}>Завантаження...</p>
			</div>
		</div>
	)
}

export default Preloader
