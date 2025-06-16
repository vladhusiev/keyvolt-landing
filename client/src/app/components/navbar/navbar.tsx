import Image from 'next/image'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import Button from '../custom/Button/button'

interface MenuItem {
	id: string
	label: string
	href: string
}

const menuItems: MenuItem[] = [
	{ id: 'for-whom', label: 'Для кого', href: '#for-whom' },
	{ id: 'how-it-works', label: 'Принцип роботи', href: '#how-it-works' },
	{ id: 'economics', label: 'Економіка', href: '#economics' },
	{ id: 'cases', label: 'Кейси', href: '#cases' },
	{ id: 'about', label: 'Про Нас', href: '#about' }
]

const Navbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Image
						src="/images/logo.svg"
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
								<a href={item.href} className={styles.menuLink}>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<Button variant="altLight" className={styles.contactButton}>
					Контактна форма
				</Button>
			</div>
		</nav>
	)
}

export default Navbar
