import React from 'react'
import styles from './testimonials.module.css'

interface Testimonial {
	id: number
	name: string
	role: string
	company: string
	content: string
	avatar: string
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		name: 'John Smith',
		role: 'Homeowner',
		company: 'Residential',
		content:
			'Switching to solar energy was the best decision we made. The installation was smooth, and our energy bills have decreased significantly. The team at KeyVolt was professional and knowledgeable throughout the process.',
		avatar: '/avatars/john-smith.jpg'
	},
	{
		id: 2,
		name: 'Sarah Johnson',
		role: 'Business Owner',
		company: 'Green Solutions Inc.',
		content:
			"As a business owner, I was looking for ways to reduce operational costs and make our company more sustainable. KeyVolt's commercial solar solutions have exceeded our expectations in both aspects.",
		avatar: '/avatars/sarah-johnson.jpg'
	},
	{
		id: 3,
		name: 'Michael Brown',
		role: 'Property Manager',
		company: 'Urban Properties',
		content:
			'We manage multiple residential properties, and KeyVolt has helped us implement solar solutions across our portfolio. Their expertise in large-scale installations and maintenance has been invaluable.',
		avatar: '/avatars/michael-brown.jpg'
	}
]

const Testimonials: React.FC = () => {
	return (
		<section className={styles.testimonials}>
			<div className={styles.container}>
				<h2 className={styles.title}>What Our Clients Say</h2>
				<div className={styles.grid}>
					{testimonials.map(testimonial => (
						<div
							key={testimonial.id}
							className={styles.testimonial}
						>
							<div className={styles.content}>
								<p className={styles.quote}>
									{testimonial.content}
								</p>
							</div>
							<div className={styles.author}>
								<img
									src={testimonial.avatar}
									alt={testimonial.name}
									className={styles.avatar}
								/>
								<div className={styles.authorInfo}>
									<h3 className={styles.name}>
										{testimonial.name}
									</h3>
									<p className={styles.role}>
										{testimonial.role} at{' '}
										{testimonial.company}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Testimonials
