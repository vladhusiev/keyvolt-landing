import Container from '@/app/components/container/container'
import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import { menuItems } from '@/app/utlis/menu-items'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'

const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<div className={styles.footer__content}>
					<div className={styles.footer__logo}>
						<Link href="/" className={styles.footer__logoImage}>
							<Image
								src={getOptimizedImageUrl('/images/logo.svg', {
									width: 130,
									height: 50,
									quality: 90
								})}
								alt="logo"
								width={130}
								height={50}
							/>
						</Link>
						<p className={styles.footer__logoText}>
							Ваш партнер з енергетичної незалежності
						</p>

						<p className={styles.footer__copyright}>
							© {new Date().getFullYear()} KeyVolt Energy. Всі
							права захищені.
						</p>
					</div>

					<div className={styles.footer__nav}>
						<p className={styles.footer__navTitle}>Навігація</p>
						<ul className={styles.footer__navList}>
							{menuItems.map(item => {
								const isExternalLink =
									!item.href.startsWith('#')
								const targetHref = isExternalLink
									? item.href
									: `/${item.href}`

								return (
									<li
										key={item.id}
										className={styles.footer__navItem}
									>
										<Link
											href={targetHref}
											className={styles.footer__navLink}
										>
											{item.label}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>

					<div className={styles.footer__contacts}>
						<p className={styles.footer__contactsTitle}>Контакти</p>
						<div className={styles.footer__contactsList}>
							<a
								href="tel:+380991234567"
								className={styles.footer__contact}
							>
								+38 (099) 123-45-67
							</a>
							<a
								href="mailto:info@keyvoltenergy.com.ua"
								className={styles.footer__contact}
							>
								info@keyvoltenergy.com.ua
							</a>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
