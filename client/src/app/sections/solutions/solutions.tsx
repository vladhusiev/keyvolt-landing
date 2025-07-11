'use client'

import Container from '@/app/components/container/container'
import Button from '@/app/components/custom/Button/button'
import Title from '@/app/components/custom/Title/title'
import { SolutionsData } from '@/app/hooks/useData'
import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './solutions.module.css'

interface SolutionsProps {
	solutionsContent: SolutionsData[]
}

const Solutions: React.FC<SolutionsProps> = ({ solutionsContent }) => {
	const [activeTab, setActiveTab] = useState(0)
	const [isFading, setIsFading] = useState(false)

	const solutions = solutionsContent
	const active = solutions?.[activeTab]

	// Preload all images on component mount
	useEffect(() => {
		if (solutions) {
			solutions.forEach(solution => {
				if (solution.image?.url) {
					const optimizedUrl = getOptimizedImageUrl(
						solution.image.url,
						1200,
						740,
						85
					)
					const img = new window.Image()
					img.src = optimizedUrl
				}
			})
		}
	}, [solutions])

	const handleTabClick = (idx: number) => {
		if (idx === activeTab) return
		setActiveTab(idx)
		setIsFading(true)
		setTimeout(() => {
			setIsFading(false)
			const contentElement = document.querySelector(`.${styles.right}`)
			if (contentElement) {
				contentElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				})
			}
		}, 150) // Reduced timeout for faster response
	}

	return (
		<section className={styles.solutionsSection} id="solutions">
			<Container>
				<div className={styles.header}>
					<div className={styles.titleWrap}>
						<Title>
							Рішення, яке
							<br />
							підходить для усіх
						</Title>
					</div>
					<div className={styles.sublabel}>
						Ми не продаємо – ми будуємо енергетичне партнерство
						<br />
						Встановлення за наш кошт. Результати – вже з першого дня
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.left}>
						<div className={styles.list}>
							{solutions?.map((item, idx) => (
								<button
									key={idx}
									className={`${styles.listItem} ${
										activeTab === idx ? styles.active : ''
									}`}
									onClick={() => handleTabClick(idx)}
									type="button"
								>
									<div className={styles.itemContent}>
										<div className={styles.itemContentTop}>
											<span className={styles.itemIcon}>
												{item.icon}
											</span>
											<div className={styles.itemTitle}>
												{item.name}
											</div>
										</div>

										<div className={styles.itemDesc}>
											{item.description}
										</div>
									</div>
								</button>
							))}
						</div>
					</div>
					<div className={styles.right}>
						{active && (
							<div
								className={`${styles.tabs} ${
									isFading ? styles.fading : ''
								}`}
							>
								<div className={styles.imageWrap}>
									<Image
										src={getOptimizedImageUrl(
											active.image.url,
											1200,
											740,
											85
										)}
										alt={active.name}
										className={styles.image}
										fill
										quality={85}
										priority={activeTab === 0}
										loading={
											activeTab === 0 ? 'eager' : 'lazy'
										}
									/>
									<div className={styles.imageNote}>
										{active.main_text}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className={styles.buttonWrap}>
					<Button
						arrow={true}
						onClick={() => {
							const el = document.getElementById('economics')
							if (el) {
								el.scrollIntoView({ behavior: 'smooth' })
							}
						}}
					>
						Отримати розрахунок
					</Button>
				</div>
			</Container>
		</section>
	)
}

export default Solutions
