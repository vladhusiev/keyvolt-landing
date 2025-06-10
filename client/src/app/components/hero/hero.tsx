'use client'

import Button from '@/app/components/custom/Button/button'

import HeroCard from '@/app/components/custom/HeroCard/heroCard'
import BanknoteArrowUpIcon from '@/app/components/custom/HeroCard/icons/banknote-arrow-up.svg'
import HandshakeIcon from '@/app/components/custom/HeroCard/icons/handshake.svg'
import PlugZapIcon from '@/app/components/custom/HeroCard/icons/plug-zap.svg'
import PlugIcon from '@/app/components/custom/HeroCard/icons/plug.svg'
import Navbar from '../navbar/navbar'
import styles from './hero.module.css'

const features = [
	{
		icon: <BanknoteArrowUpIcon width={32} height={32} />,
		text: 'Ми інвестуємо у встановлення СЕС + BESS на вашому обєкті'
	},
	{
		icon: <PlugIcon width={32} height={32} />,
		text: 'Ви отримуєте прибуток з електроенергії вже з першого дня'
	},
	{
		icon: <HandshakeIcon width={32} height={32} />,
		text: 'Прозоре партнерство, де результат – ваша енергонезалежність'
	},
	{
		icon: <PlugZapIcon width={32} height={32} />,
		text: 'Надійний партнер у сфері енергії на роки вперед'
	}
]

export default function Hero() {
	return (
		<section className={styles.hero}>
			<Navbar />
			<div className={styles.container}>
				<div className={styles.content}>
					<h1 className={styles.title}>
						Ваш партнер
						<br /> з енергетичної незалежності
					</h1>
					<p className={styles.description}>
						Ми не продаємо – ми будуємо енергетичне партнерство
						<br />
						Встановлення за наш кошт. Результати – вже з першого дня
					</p>
					<div className={styles.buttonContainer}>
						<Button onClick={() => {}}>
							Запросити безкоштовний аудит
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.featuresRow}>
				{features.map(f => (
					<HeroCard key={f.text} icon={f.icon}>
						{f.text}
					</HeroCard>
				))}
			</div>
		</section>
	)
}
