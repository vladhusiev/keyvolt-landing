import { getServerData } from '@/app/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import Container from '../components/container/container'
import Title from '../components/custom/Title/title'
import Navbar from '../components/navbar/navbar'
import Footer from '../sections/footer/footer'
import VacancyCard from './components/vacancy-card/vacancy-card'
import styles from './page.module.css'

export const metadata = {
	title: 'Вакансії | KeyVolt Energy',
	description:
		'Приєднуйтесь до команди KeyVolt Energy. Знайдіть свою ідеальну вакансію в сфері сонячної енергетики'
}

export default async function VacanciesPage() {
	const { vacanciesData } = await getServerData()

	return (
		<main className={styles.vacanciesMain}>
			<section className={styles.heroSection}>
				<Image
					className={styles.heroImage}
					src="/images/vacancy_bg.jpg"
					alt="Hero"
					fill
					priority
					quality={90}
				/>
				<Navbar />
				<Container>
					<div className={styles.heroContent}>
						<Title decorator={false} className={styles.heroTitle}>
							Вакансії
						</Title>
						<p className={styles.heroDescription}>
							Приєднуйтесь до команди KeyVolt Energy та допоможіть
							нам створювати майбутнє сонячної енергетики в
							Україні
						</p>
					</div>
				</Container>
			</section>

			<section className={styles.vacanciesSection}>
				<Container>
					{vacanciesData.length > 0 && (
						<div className={styles.vacanciesHeader}>
							<Title>Відкриті позиції</Title>
							<p className={styles.sectionDescription}>
								Ми шукаємо талановитих та мотивованих
								спеціалістів для розвитку сонячної енергетики в
								Україні
							</p>
						</div>
					)}

					{vacanciesData.length > 0 ? (
						<div className={styles.vacanciesGrid}>
							{vacanciesData.map(vacancy => (
								<VacancyCard
									key={vacancy.id}
									vacancy={vacancy}
								/>
							))}
						</div>
					) : (
						<div className={styles.noVacancies}>
							<div className={styles.noVacanciesIcon}>
								<svg
									width="80"
									height="80"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M20 6L9 17L4 12"
										stroke="#eebd00"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3 className={styles.noVacanciesTitle}>
								Наразі немає відкритих вакансій
							</h3>
							<p className={styles.noVacanciesDescription}>
								Ми активно розвиваємося та шукаємо талановитих
								спеціалістів. Надішліть своє резюме, і ми
								зв&apos;яжемося з вами, коли з&apos;явиться
								відповідна позиція.
							</p>
							<div className={styles.noVacanciesActions}>
								<Link
									href="mailto:info@keyvoltenergy.com.ua"
									className={styles.noVacanciesButton}
								>
									Зв&apos;язатися з нами
								</Link>
							</div>
						</div>
					)}
				</Container>
			</section>

			<Footer />
		</main>
	)
}
