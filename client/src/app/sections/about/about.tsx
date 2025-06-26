import Container from '@/app/components/container/container'
import Title from '@/app/components/custom/Title/title'

import styles from './about.module.css'

const About: React.FC<{
	aboutContent: {
		about_title: string
		about_subtitle: string
		about_description: string
	}
}> = ({ aboutContent }) => {
	const { about_title, about_subtitle, about_description } = aboutContent
	return (
		<section className={styles.about} id="about">
			<Container>
				<Title className={styles.about__title}>{about_title}</Title>
				<article className={styles.about__content}>
					<h3 className={styles.about__contentHeading} dangerouslySetInnerHTML={{ __html: about_subtitle }} />

					<p className={styles.about__contentText} dangerouslySetInnerHTML={{ __html: about_description }} />
				</article>

				{/* <div className={styles.about__partners}>
					<Image
						className={styles.about__partner}
						src="/images/partner.png"
						alt="Partner 1"
						width={110}
						height={30}
					/>
					<Image
						className={styles.about__partner}
						src="/images/partner.png"
						alt="Partner 1"
						width={110}
						height={30}
					/>
					<Image
						className={styles.about__partner}
						src="/images/partner.png"
						alt="Partner 1"
						width={110}
						height={30}
					/>
					<Image
						className={styles.about__partner}
						src="/images/partner.png"
						alt="Partner 1"
						width={110}
						height={30}
					/>
				</div> */}
			</Container>
		</section>
	)
}

export default About
