'use client'

import styles from './benefits.module.css'

const benefits = [
	{
		number: '01',
		title: 'Професійний монтаж',
		description:
			'Наші спеціалісти мають великий досвід у встановленні сонячних електростанцій та гарантують якість роботи'
	},
	{
		number: '02',
		title: 'Гарантія на обладнання',
		description:
			'Ми працюємо тільки з перевіреними виробниками та надаємо гарантію на все обладнання'
	},
	{
		number: '03',
		title: 'Повний супровід',
		description:
			'Допоможемо з оформленням всіх необхідних документів та підключенням до зеленої енергії'
	},
	{
		number: '04',
		title: 'Технічна підтримка',
		description:
			'Надаємо постійну технічну підтримку та обслуговування вашої електростанції'
	}
]

export default function Benefits() {
	return (
		<section className={styles.benefits}>
			<div className={styles.container}>
				<h2 className={styles.title}>Чому обирають нас</h2>
				<div className={styles.grid}>
					{benefits.map((benefit, index) => (
						<div key={index} className={styles.benefit}>
							<div className={styles.number}>
								{benefit.number}
							</div>
							<h3 className={styles.benefitTitle}>
								{benefit.title}
							</h3>
							<p className={styles.description}>
								{benefit.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
