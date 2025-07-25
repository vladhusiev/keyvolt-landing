'use client'

import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import { menuItems } from '@/app/utlis/menu-items'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from '../custom/Button/button'
import styles from './navbar.module.css'

const Navbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleMenuItemClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string
	) => {
		e.preventDefault()
		const id = href.replace('#', '')
		const el = document.getElementById(id)
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' })
		}
		setIsMenuOpen(false)
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles.logo}>
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
				</div>

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
						{menuItems.map(item => (
							<li key={item.id} className={styles.menuItem}>
								<a
									href={item.href}
									className={styles.menuLink}
									onClick={e =>
										handleMenuItemClick(e, item.href)
									}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<Button
					variant="altLight"
					className={styles.contactButton}
					onClick={() => {
						const el = document.getElementById('contacts')
						if (el) {
							el.scrollIntoView({ behavior: 'smooth' })
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
