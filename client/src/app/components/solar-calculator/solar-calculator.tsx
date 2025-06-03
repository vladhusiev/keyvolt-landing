'use client'

import React, { useEffect, useState } from 'react'
import { calculateSolarSystem, REGIONS } from '../../utlis/calc.js'
import styles from './solar-calculator.module.css'
import { CalculationResults, FormData } from './types'

export default function SolarCalculator(): React.ReactElement {
	const [formData, setFormData] = useState<FormData>({
		power: '',
		place: 'default',
		tarif: '',
		region: 'kiev'
	})

	const [results, setResults] = useState<CalculationResults | null>(null)

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	useEffect(() => {
		if (formData.power && formData.tarif) {
			try {
				const calculationResults = calculateSolarSystem(formData)
				setResults(calculationResults)
			} catch (error) {
				console.error('Calculation error:', error)
			}
		}
	}, [formData])

	return (
		<div className={styles.calculatorContainer}>
			<h2 className={styles.title}>
				Калькулятор сонячної електростанції
			</h2>

			<div className={styles.formWrapper}>
				<div className={styles.formGroup}>
					<label htmlFor="power">Потужність системи (кВт)</label>
					<input
						type="number"
						id="power"
						name="power"
						value={formData.power}
						onChange={handleInputChange}
						step="0.1"
						min="0"
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="place">Місце встановлення</label>
					<select
						id="place"
						name="place"
						value={formData.place}
						onChange={handleInputChange}
					>
						<option value="default">Дах</option>
						<option value="zemlya">Земля</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="tarif">
						Тариф на електроенергію (грн/кВт⋅год)
					</label>
					<input
						type="number"
						id="tarif"
						name="tarif"
						value={formData.tarif}
						onChange={handleInputChange}
						step="0.01"
						min="0"
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="region">Область</label>
					<select
						id="region"
						name="region"
						value={formData.region}
						onChange={handleInputChange}
					>
						{Object.entries(REGIONS).map(([key, value]) => (
							<option key={key} value={key}>
								{value.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className={styles.results}>
				{results ? (
					<>
						<div className={styles.resultItem}>
							<span className={styles.label}>
								Потужність системи:
							</span>
							<span className={styles.value}>
								{results.power} кВт
							</span>
						</div>
						<div className={styles.resultItem}>
							<span className={styles.label}>
								Вартість системи:
							</span>
							<span className={styles.value}>
								{results.price} $
							</span>
						</div>
						<div className={styles.resultItem}>
							<span className={styles.label}>
								Річна генерація:
							</span>
							<span className={styles.value}>
								{results.year_generation} кВт⋅год
							</span>
						</div>
						<div className={styles.resultItem}>
							<span className={styles.label}>
								Річна економія:
							</span>
							<span className={styles.value}>
								{results.econom} грн
							</span>
						</div>
						<div className={styles.resultItem}>
							<span className={styles.label}>
								Термін окупності:
							</span>
							<span className={styles.value}>
								{results.ocupnost}
							</span>
						</div>
					</>
				) : (
					<p className={styles.noResults}>
						Введіть дані для розрахунку
					</p>
				)}
			</div>
		</div>
	)
}
