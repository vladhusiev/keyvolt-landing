'use client'

import Preloader from '@/app/components/preloader/preloader'
import { StructuredData } from '@/app/components/seo/StructuredData'
import Cases from '@/app/sections/cases/cases'
import Footer from '@/app/sections/footer/footer'
import Hero from '@/app/sections/hero/hero'
import Map from '@/app/sections/map/map'
import Principles from '@/app/sections/principles/principles'
import SolarCalculator from '@/app/sections/solar-calculator/solar-calculator'
import Solutions from '@/app/sections/solutions/solutions'
import { useMemo } from 'react'
import {
	CasesItem,
	HeroData,
	PrinciplesItem,
	SolutionsData,
	useData
} from './hooks/useData'
import styles from './page.module.css'
import About from './sections/about/about'
import Contacts from './sections/contacts/contacts'

export default function Home() {
	const { data, isLoading } = useData()
	const heroData: HeroData = useMemo(() => {
		return {
			hero_title: data?.hero_title || '',
			hero_description: data?.hero_description || '',
			hero_btn_name: data?.hero_btn_name || '',
			features: data?.features || []
		}
	}, [data])

	const solutionsData: SolutionsData[] = useMemo(() => {
		return data?.solutions || []
	}, [data])

	const principlesData: {
		principles_title: string
		items: PrinciplesItem[]
	} = useMemo(() => {
		return {
			principles_title: data?.principles_title || '',
			items: data?.principles || []
		}
	}, [data])

	const casesData: {
		cases_title: string
		cases_description: string
		items: CasesItem[]
	} = useMemo(() => {
		return {
			cases_title: data?.cases_title || '',
			cases_description: data?.cases_description || '',
			items: data?.cases || []
		}
	}, [data])

	const aboutData: {
		about_title: string
		about_subtitle: string
		about_description: string
	} = useMemo(() => {
		return {
			about_title: data?.about_title || '',
			about_subtitle: data?.about_subtitle || '',
			about_description: data?.about_description || ''
		}
	}, [data])

	if (isLoading) {
		return <Preloader />
	}

	return (
		<>
			<StructuredData />
			<main id="main-content" className={styles.main} role="main">
				{heroData && <Hero heroContent={heroData} />}
				{solutionsData && (
					<Solutions solutionsContent={solutionsData} />
				)}
				{principlesData && (
					<Principles principlesContent={principlesData} />
				)}
				<SolarCalculator />
				{casesData && <Cases casesContent={casesData} />}
				{aboutData && <About aboutContent={aboutData} />}
				<Contacts />
				<Map />
			</main>
			<Footer />
		</>
	)
}
