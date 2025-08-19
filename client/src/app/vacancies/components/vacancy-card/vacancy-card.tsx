'use client'

import React, { useState } from 'react'
import { Vacancy } from '../../types/vacancy'
import styles from './vacancy-card.module.css'

interface VacancyCardProps {
	vacancy: Vacancy
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className={styles.card}>
			<div className={styles.cardHeader}>
				<div className={styles.titleSection}>
					<h3 className={styles.jobTitle}>{vacancy.title}</h3>
					{vacancy.salary && (
						<div className={styles.salary}>{vacancy.salary}</div>
					)}
				</div>
				<button
					className={`${styles.expandButton} ${
						isExpanded ? styles.expanded : ''
					}`}
					onClick={toggleExpanded}
					aria-label={
						isExpanded ? 'Згорнути деталі' : 'Розгорнути деталі'
					}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7 10l5 5 5-5"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>

			<div className={styles.cardBody}>
				<div className={styles.companyInfo}>
					<div className={styles.tags}>
						{vacancy.type && (
							<span className={`${styles.tag} ${styles.typeTag}`}>
								{vacancy.type}
							</span>
						)}
						{vacancy.location && (
							<span
								className={`${styles.tag} ${styles.locationTag}`}
							>
								{vacancy.location}
							</span>
						)}
					</div>
				</div>

				<p className={styles.description}>{vacancy.shortDescription}</p>

				{isExpanded && (
					<div className={styles.expandedContent}>
						123
						<div className={styles.applySection}>
							<a
								href={`mailto:hr@keyvolt.energy?subject=Відгук на вакансію: ${vacancy.title}`}
								className={styles.applyButton}
							>
								Відгукнутися
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default VacancyCard
