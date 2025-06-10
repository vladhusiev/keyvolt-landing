import React, { useState } from 'react'
import styles from './contact.module.css'

const Contact: React.FC = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: ''
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// TODO: Implement form submission logic
		console.log('Form submitted:', formData)
	}

	return (
		<section className={styles.contact}>
			<div className={styles.container}>
				<h2 className={styles.title}>Get in Touch</h2>
				<p className={styles.subtitle}>
					Ready to start your solar journey? Contact us today for a
					free consultation.
				</p>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="phone">Phone</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="message">Message</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							required
							rows={4}
						/>
					</div>
					<button type="submit" className={styles.submitButton}>
						Send Message
					</button>
				</form>
			</div>
		</section>
	)
}

export default Contact
