import Accordion from '@/app/components/accordion/Accordion'
import Container from '@/app/components/container/container'
import Title from '@/app/components/custom/Title/title'
import styles from './cases.module.css'

export default function Cases() {
	return (
		<section className={styles.cases} id="cases">
			<Container>
				<Title>Наші кейси</Title>
				<p className={styles.cases__desc}>
					Ми вже реалізували десятки рішень для бізнесу, держави та
					житлового сектору. Ознайомтесь із прикладами впровадження та
					результатами, яких досягли наші клієнти — від економії до
					повної енергонезалежності.
				</p>
				<Accordion
					items={[
						{
							title: 'АЗС "ОККО"',
							image: '/images/okko.jpg',
							description: (
								<>
									<p>
										Ми вже реалізували десятки рішень для
										бізнесу, держави та житлового сектору.
										Ознайомтесь із прикладами впровадження
										та результатами, яких досягли наші
										клієнти — від економії до повної
										енергонезалежності.
									</p>
								</>
							)
						},
						{
							title: 'ТЦ "РЕСПУБЛІКА"',
							image: '/images/okko.jpg',
							description: (
								<>
									<p>Тут буде опис другого кейсу.</p>
								</>
							)
						}
					]}
				/>
			</Container>
		</section>
	)
}
