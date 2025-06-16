import Button from '@/app/components/custom/Button/button'
import HeroCard from '@/app/components/custom/HeroCard/heroCard'
import { useData } from '@/app/hooks/useData'
import Navbar from '../../components/navbar/navbar'
import styles from './hero.module.css'

export default function Hero() {
	const { data } = useData()

	if (!data) {
		return <div>Loading...</div>
	}

	const title = data.hero_title
	const description = data.hero_description
	const buttonLabel = data.hero_btn_name
	const features = data.features

	return (
		<section className={styles.hero}>
			<Navbar />
			<div className={styles.container}>
				<div className={styles.content}>
					<h1 className={styles.title}>{title}</h1>
					<p className={styles.description}>{description}</p>
					<div className={styles.buttonContainer}>
						<Button arrow={true} onClick={() => {}}>{buttonLabel}</Button>
					</div>
				</div>
			</div>
			<div className={styles.featuresRow}>
				{features.map(f => (
					<HeroCard key={f.id} icon={f.icon.url}>
						{f.text}
					</HeroCard>
				))}
			</div>
		</section>
	)
}
