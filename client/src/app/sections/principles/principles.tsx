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
	console.log('Principles items:', JSON.stringify(items, null, 2))

	// const getDescriptionHtml = (description: unknown): string => {
	// 	if (isSlateNodes(description)) {
	// 		return slateToHtml(description)
	// 	}
	// 	if (isStrapiBlocks(description)) {
	// 		return blocksToHtml(description)
	// 	}
	// 	if (typeof description === 'string') {
	// 		return description
	// 	}
	// 	return ''
	// }

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
								{renderSlateToHtml(
									card.description as SlateNode[]
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Principles
