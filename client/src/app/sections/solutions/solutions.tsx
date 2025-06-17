'use client'

import Container from '@/app/components/container/container'
import Button from '@/app/components/custom/Button/button'
import Title from '@/app/components/custom/Title/title'
import { useData } from '@/app/hooks/useData'
import Image from 'next/image'
import { useState } from 'react'
import styles from './solutions.module.css'

export default function Solutions() {
	const { data } = useData()
	const [activeTab, setActiveTab] = useState(0)
	const [isFading, setIsFading] = useState(false)

	const solutions = data?.solutions
	const active = solutions?.[activeTab]
	// const imageUrl = new URL(
	// 	active.image.url,
	// 	process.env.NEXT_PUBLIC_STRAPI_URL
	// ).toString()

	const handleTabClick = (idx: number) => {
		if (idx === activeTab) return
		setIsFading(true)
		setTimeout(() => {
			setActiveTab(idx)
			setIsFading(false)
		}, 250)
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
										src={active.image.url}
										alt={active.name}
										width={420}
										height={320}
										className={styles.image}
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
