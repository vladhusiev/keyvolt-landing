'use client'

import styles from './success-modal.module.css'

interface SuccessModalProps {
	isOpen: boolean
	onClose: () => void
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
	if (!isOpen) return null

	return (
		<div>
			{/* Backdrop with animation */}
			<div className={styles.backdrop} onClick={onClose} />

			{/* Modal with animation */}
			<div className={styles.modalWrapper}>
				<div className={styles.modal}>
					<div className={styles.iconWrap}>
						<svg
							className={styles.icon}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h3 className={styles.title}>
						Повідомлення успішно відправлено
					</h3>
					<p className={styles.text}>
						Дякуємо за звернення! Ми зв&apos;яжемося з вами в
						найближчий час.
					</p>
					<button onClick={onClose} className={styles.button}>
						Закрити
					</button>
				</div>
			</div>
		</div>
	)
}
