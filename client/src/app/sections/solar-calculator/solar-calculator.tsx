'use client'

import Container from '@/app/components/container/container'
import Button from '@/app/components/custom/Button/button'
import FormField from '@/app/components/form-field/form-field'
import Input from '@/app/components/input/input'
import Label from '@/app/components/label/label'
import Select from '@/app/components/select/select'
import React, { useEffect, useState } from 'react'
import { calculateSolarSystem, PLACES, REGIONS } from '../../utlis/calc.js'
import styles from './solar-calculator.module.css'
import { CalculationResults, FormData } from './types.js'

const regionOptions = Object.entries(REGIONS).map(([key, value]) => ({
	value: key,
	label: value.name
}))

const placeOptions = PLACES.map(place => ({
	value: place.value,
	label: place.label
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
			} catch {
				// Handle calculation error silently
			}
		}
	}, [formData])

	return (
		<section className={styles.calculatorSection} id="economics">
			<Container>
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
						<FormField>
							<Label id="power" htmlFor="power">
								Потужність системи (кВт)
							</Label>
							<Input
								type="number"
								value={formData.power}
								onChange={handleInputChange}
								name="power"
								className={styles.inputNumber}
								min={1}
								max={1000000}
								placeholder="Вкажіть потужність системи"
								aria-labelledby="power"
								id="power"
							/>
						</FormField>
						<FormField>
							<Label id="place" htmlFor="place">Місце встановлення</Label>
							<Select
								value={formData.place}
								onChange={handleInputChange}
								name="place"
								options={placeOptions}
								id="place"
								aria-labelledby="place"
							/>
						</FormField>

						<FormField>
							<Label id="tarif" htmlFor="tarif">
								Тариф на електроенергію (грн/кВт⋅год)
							</Label>
							<Input
								type="number"
								value={formData.tarif}
								onChange={handleInputChange}
								name="tarif"
								className={styles.inputNumber}
								min={0}
								max={10000}
								placeholder="Вкажіть тариф на електроенергію"
								aria-labelledby="tarif"
								id="tarif"
							/>
						</FormField>

						<FormField>
							<Label id="region" htmlFor="region">Область</Label>
							<Select
								value={formData.region}
								onChange={handleInputChange}
								name="region"
								options={regionOptions}
								aria-labelledby="region"
								id="region"
							/>
						</FormField>
					</form>
					<div className={styles.resultBox}>
						<div className={styles.resultBox__item}>
							<span>Потужність системи:</span>
							<b>{results?.power} кВт</b>
						</div>
						<div className={styles.resultBox__item}>
							<span>Вартість системи:</span>
							<b>{results?.price} грн</b>
						</div>
						<div className={styles.resultBox__item}>
							<span>Річна генерація:</span>
							<b>{results?.year_generation} кВт⋅год</b>
						</div>
						<div className={styles.resultBox__item}>
							<span>Річна економія:</span>
							<b className={styles.highlight}>
								{results?.econom} грн
							</b>
						</div>
						<div className={styles.resultBox__item}>
							<span>Термін окупності:</span>
							<b className={styles.highlight}>
								{results?.ocupnost}
							</b>
						</div>
						<Button
							className={styles.button}
							onClick={() => {
								const el = document.getElementById('contacts')
								if (el) {
									el.scrollIntoView({ behavior: 'smooth' })
								}
							}}
						>
							Залишити заявку
						</Button>
					</div>
				</div>
			</Container>
		</section>
	)
}
