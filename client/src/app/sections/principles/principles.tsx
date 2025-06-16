import Title from '@/app/components/custom/Title/title'
import styles from './principles.module.css'

const cards = [
	{
		number: '1.',
		title: 'Генерація енергії (CEC)',
		text: [
			'Сонячні панелі виробляють постійний струм (DC) у денний час',
			'Інвертор перетворює його на змінний струм (AC) для використання в мережі',
			"Частина енергії одразу подається на об'єкт споживання"
		]
	},
	{
		number: '2.',
		title: 'Заряджання накопичувача (BESS)',
		text: [
			"Надлишок енергії, не використаної об'єктом, направляється на заряджання батарей",
			'Система BESS зберігає енергію у вигляді DC-струму, який у разі потреби перетворюється інвертором у AC'
		]
	},
	{
		number: '3.',
		title: 'Споживання енергії з BESS',
		text: [
			'У нічний час або при пікових навантаженнях:',
			"BESS автоматично підключається й подає енергію в мережу об'єкта",
			'Це знижує навантаження на зовнішню мережу або повністю забезпечує автономність'
		]
	},
	{
		number: '4.',
		title: 'Енергетичний менеджмент',
		text: [
			'Система керування (EMS) автоматично:',
			'Визначає пріоритети споживання',
			'Керує зарядом/розрядом BESS',
			"Підключає/відключає об'єкт від мережі при необхідності",
			'Можливе віддалене керування та моніторинг у реальному часі'
		]
	}
]

const Principles = () => {
	return (
		<section className={styles.principles} id="how-it-works">
			<div className={styles.container}>
				<Title>Принцип роботи</Title>
				<div className={styles.cardsGrid}>
					{cards.map((card, idx) => (
						<div className={styles.card} key={idx}>
							<div className={styles.cardTitle}>
								<span className={styles.cardNumber}>
									{card.number}
								</span>{' '}
								{card.title}
							</div>
							<div className={styles.cardText}>
								{card.text.map((line, i) => (
									<span key={i}>
										{line}
										{i !== card.text.length - 1 && <br />}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Principles
