import Title from '@/app/components/custom/Title/title'
import { PrinciplesItem } from '@/app/hooks/useData'
import { renderSlateToHtml, SlateNode } from '@/app/utlis/strapi-blocks'
import styles from './principles.module.css'

const Principles = ({
	principlesContent
}: {
	principlesContent: { principles_title: string; items: PrinciplesItem[] }
}) => {
	const { principles_title, items } = principlesContent

	return (
		<section className={styles.principles} id="how-it-works">
			<div className={styles.container}>
				<Title>{principles_title}</Title>
				<div className={styles.cardsGrid}>
					{items.map((card, idx) => (
						<div className={styles.card} key={card.id}>
							<div className={styles.cardTitle}>
								<span className={styles.cardNumber}>
									{idx + 1}.
								</span>{' '}
								{card.title}
							</div>
							<div className={styles.cardText}>
								<div
									dangerouslySetInnerHTML={{
										__html: renderSlateToHtml(
											card.description as unknown as SlateNode[]
										)
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Principles
