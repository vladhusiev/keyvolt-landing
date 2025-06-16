'use client'

import Button from '@/app/components/custom/Button/button'
import React, { useEffect, useState } from 'react'
import { calculateSolarSystem, REGIONS } from '../../utlis/calc.js'
import styles from './solar-calculator.module.css'
import { CalculationResults, FormData } from './types.js'

const regionOptions = Object.entries(REGIONS).map(([key, value]) => ({
	value: key,
	label: value.name
}))

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
		<section className={styles.calculatorSection}>
			<h2 className={styles.title}>
				Калькулятор сонячної електростанції
			</h2>
			<p className={styles.subtitle}>
				Скористайтеся ROI-калькулятором для розрахування потенційної
				економії користування нашим рішенням
			</p>
			<div className={styles.calculatorGrid}>
				<form
					className={styles.form}
					onSubmit={e => e.preventDefault()}
				>
					<label>
						Потужність системи (кВт)
						<input
							type="number"
							value={formData.power}
							onChange={handleInputChange}
							name="power"
							className={styles.inputNumber}
							min={1}
						/>
					</label>
					<label>
						Місце встановлення
						<select
							value={formData.place}
							onChange={handleInputChange}
							name="place"
						>
							<option value="default">Дах</option>
							<option value="zemlya">Земля</option>
						</select>
					</label>
					<label>
						Тариф на електроенергію (грн/кВт⋅год)
						<input
							type="number"
							value={formData.tarif}
							onChange={handleInputChange}
							name="tarif"
							className={styles.inputNumber}
							min={0}
						/>
					</label>
					<label>
						Область
						<select
							value={formData.region}
							onChange={handleInputChange}
							name="region"
						>
							{regionOptions.map(opt => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</label>
				</form>
				<div className={styles.resultBox}>
					<div>
						<span>Потужність системи:</span>
						<b>{results?.power} кВт</b>
					</div>
					<div>
						<span>Вартість системи:</span>
						<b>{results?.price} $</b>
					</div>
					<div>
						<span>Річна генерація:</span>
						<b>{results?.year_generation} кВт⋅год</b>
					</div>
					<div>
						<span>Річна економія:</span>
						<b className={styles.highlight}>
							{results?.econom} грн
						</b>
					</div>
					<div>
						<span>Термін окупності:</span>
						<b className={styles.highlight}>{results?.ocupnost}</b>
					</div>
					<Button>Залишити заявку</Button>
				</div>
			</div>
		</section>
	)
}
