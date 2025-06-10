import Image from 'next/image'
import React from 'react'
import styles from './button.module.css'
export interface ButtonProps {
	children: React.ReactNode
	onClick?: () => void
	className?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return (
		<button
			className={`${styles.customButton} ${className || ''}`}
			onClick={onClick}
		>
			<span className={styles.customButtonText}>{children}</span>
			<div className={styles.customButtonIcon}>
				<Image
					src="/images/icons/arrow-right.svg"
					alt="Arrow right"
					width={28}
					height={28}
				/>
			</div>
		</button>
	)
}

export default Button
