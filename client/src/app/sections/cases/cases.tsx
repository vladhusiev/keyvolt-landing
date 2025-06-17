import Accordion from '@/app/components/accordion/Accordion'
import Container from '@/app/components/container/container'
import Title from '@/app/components/custom/Title/title'
import { CasesItem } from '@/app/hooks/useData'
import styles from './cases.module.css'

export default function Cases({
	casesContent
}: {
	casesContent: {
		cases_title: string
		cases_description: string
		items: CasesItem[]
	}
}) {
	const { cases_title, cases_description, items } = casesContent
	return (
		<section className={styles.cases} id="cases">
			<Container>
				<Title>{cases_title}</Title>
				<p className={styles.cases__desc}>{cases_description}</p>
				<Accordion
					items={items.map(item => ({
						title: item.title,
						image: item.image.url,
						description: (
							<>
								<p>{item.description}</p>
							</>
						)
					}))}
				/>
			</Container>
		</section>
	)
}
