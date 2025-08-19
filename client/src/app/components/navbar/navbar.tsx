'use client'

import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import { menuItems } from '@/app/utlis/menu-items'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from '../custom/Button/button'
import styles from './navbar.module.css'

const Navbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathname = usePathname()
	const router = useRouter()

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleMenuItemClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		hashHref: string
	) => {
		const onHomePage = pathname === '/'
		if (onHomePage) {
			e.preventDefault()
			const id = hashHref.replace('#', '')
			const el = document.getElementById(id)
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' })
			}
		}
		setIsMenuOpen(false)
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<Link href="/" className={styles.logo}>
					<Image
						src={getOptimizedImageUrl('/images/logo.svg', {
							width: 120,
							height: 40,
							quality: 90
						})}
						alt="KeyVolt"
						className={styles.logoImage}
						width={120}
						height={40}
						priority
					/>
				</Link>

				<button
					className={`${styles.menuButton} ${
						isMenuOpen ? styles.active : ''
					}`}
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>

				<div
					className={`${styles.menu} ${
						isMenuOpen ? styles.active : ''
					}`}
				>
					<ul className={styles.menuList}>
						{menuItems.map(item => {
							const isExternalLink = !item.href.startsWith('#')
							const targetHref = isExternalLink
								? item.href
								: pathname === '/'
								? item.href
								: `/${item.href}`

							return (
								<li key={item.id} className={styles.menuItem}>
									<Link
										href={targetHref}
										className={styles.menuLink}
										onClick={
											isExternalLink
												? undefined
												: e =>
														handleMenuItemClick(
															e,
															item.href
														)
										}
									>
										{item.label}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
				<Button
					variant="altLight"
					className={styles.contactButton}
					onClick={() => {
						const el = document.getElementById('contacts')
						if (el) {
							el.scrollIntoView({ behavior: 'smooth' })
						} else {
							router.push('/#contacts')
						}
					}}
				>
					Контактна форма
				</Button>
			</div>
		</nav>
	)
}

export default Navbar
