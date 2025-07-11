'use client'

import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ArrowIcon } from '../icons'
import styles from './accordion.module.css'

interface AccordionItem {
	title: string
	description: React.ReactNode
	image?: string
}

interface AccordionProps {
	items: AccordionItem[]
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	// Preload all images on component mount
	useEffect(() => {
		items.forEach(item => {
			if (item.image) {
				const optimizedUrl = getOptimizedImageUrl(
					item.image,
					1200,
					453,
					85
				)
				const img = new window.Image()
				img.src = optimizedUrl
			}
		})
	}, [items])

	const toggleIndex = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<div className={styles.accordion}>
			{items.map((item, idx) => (
				<div key={idx} className={styles.accordion__item}>
					<div
						className={styles.accordion__title}
						onClick={() => toggleIndex(idx)}
					>
						<span className={styles.accordion__title__number}>
							{`${idx + 1}`.padStart(2, '0')}
						</span>
						{item.title}
						<span className={styles.accordion__title__arrow}>
							<ArrowIcon
								className={`${
									styles.accordion__title__arrow__icon
								}${
									openIndex === idx
										? ' ' +
										  styles.accordion__title__arrow__icon__active
										: ''
								}`}
							/>
						</span>
					</div>
					<div
						className={
							openIndex === idx
								? styles.accordion__content__open
								: styles.accordion__content
						}
					>
						{openIndex === idx && (
							<div
								className={styles.accordion__content__container}
							>
								{item.image && (
									<Image
										src={getOptimizedImageUrl(
											item.image,
											1200,
											453,
											85
										)}
										alt={item.title}
										width={1200}
										height={453}
										priority={false}
										loading="eager"
										quality={85}
									/>
								)}
								<div
									className={styles.accordion__content__text}
								>
									<h3
										className={
											styles.accordion__content__text__title
										}
									>
										{item.title}
									</h3>
									<p
										className={
											styles.accordion__content__text__description
										}
									>
										{item.description}
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	)
}

export default Accordion
