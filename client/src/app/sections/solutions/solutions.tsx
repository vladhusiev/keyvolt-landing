import Button from '@/app/components/custom/Button/button'
import Title from '@/app/components/custom/Title/title'
import { useData } from '@/app/hooks/useData'
import Image from 'next/image'
import { useState } from 'react'
import styles from './solutions.module.css'
// const solutions = [
// 	{
// 		icon: '🔌',
// 		title: 'АЗС',
// 		desc: 'Зменшення витрат і стабільна робота навіть без мережі.',
// 		image: '/images/solutions-gas.jpg',
// 		rightText:
// 			'АЗС: Зменшення витрат і стабільна робота навіть без мережі.',
// 		imageNote: 'АЗС — автономія та стабільність для заправок.'
// 	},
// 	{
// 		icon: '🏭',
// 		title: 'Виробництво',
// 		desc: 'Зниження пікових навантажень і енергетична стабільність.',
// 		image: '/images/solutions-factory.jpg',
// 		rightText:
// 			'Виробництво: Зниження пікових навантажень і енергетична стабільність.',
// 		imageNote: 'Виробництво — стабільна енергетика для підприємств.'
// 	},
// 	{
// 		icon: '🏢',
// 		title: 'Офіси / ТРЦ',
// 		desc: 'Резервне живлення та економія без капіталовкладень.',
// 		image: '/images/solutions-office.jpg',
// 		rightText:
// 			'Офіси / ТРЦ: Резервне живлення та економія без капіталовкладень.',
// 		imageNote: 'Офіси — безперебійна робота бізнесу.'
// 	},
// 	{
// 		icon: '🏛️',
// 		title: 'Бюджетні установи',
// 		desc: 'Енергонезалежність і скорочення витрат для бюджету.',
// 		image: '/images/solutions-budget.jpg',
// 		rightText:
// 			'Бюджетні установи: Енергонезалежність і скорочення витрат для бюджету.',
// 		imageNote: 'Бюджетні установи — скорочення витрат.'
// 	},
// 	{
// 		icon: '🏘️',
// 		title: 'ЖК',
// 		desc: 'Автономія для будинку та менші рахунки за електрику.',
// 		image: '/images/solutions-home.jpg',
// 		rightText: 'ЖК: Автономія для будинку та менші рахунки за електрику.',
// 		imageNote: 'ЖК — менші рахунки за електрику.'
// 	},
// 	{
// 		icon: '🏢',
// 		title: 'Великі та малі підприємства',
// 		desc: 'Гнучке рішення під масштаби бізнесу — від малого офісу до великого заводу.',
// 		image: '/images/solutions-business.jpg',
// 		rightText:
// 			'Великі та малі підприємства: Гнучке рішення під масштаби бізнесу.',
// 		imageNote: 'Підприємства — масштабованість під ваші потреби.'
// 	}
// ]

export default function Solutions() {
	const { data } = useData()
	const [activeTab, setActiveTab] = useState(0)
	const [isFading, setIsFading] = useState(false)

	if (!data) {
		return <div>Loading...</div>
	}

	const solutions = data?.solutions
	const active = solutions[activeTab]
	const imageUrl = new URL(
		active.image.url,
		process.env.NEXT_PUBLIC_STRAPI_URL
	).toString()

	const handleTabClick = (idx: number) => {
		if (idx === activeTab) return
		setIsFading(true)
		setTimeout(() => {
			setActiveTab(idx)
			setIsFading(false)
		}, 250)
	}

	return (
		<section className={styles.solutionsSection}>
			<div className={styles.container}>
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
							{solutions.map((item, idx) => (
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
						<div
							className={`${styles.tabs} ${
								isFading ? styles.fading : ''
							}`}
						>
							<div className={styles.imageWrap}>
								<Image
									src={imageUrl}
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
					</div>
				</div>
				<div className={styles.buttonWrap}>
					<Button>Отримати розрахунок</Button>
				</div>
			</div>
		</section>
	)
}
