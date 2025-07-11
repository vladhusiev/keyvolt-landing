import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import styles from './button.module.css'

interface ButtonProps {
	children: React.ReactNode
	onClick?: () => void
	className?: string
	arrow?: boolean
	variant?: 'primary' | 'altLight' | 'altDark'
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className,
	arrow = false,
	variant = 'primary',
	type = 'button',
	disabled = false
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				styles[`button__${variant}`],
				className,
				arrow && styles.button__hasArrow,
				disabled && styles.button__disabled
			)}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			<span className={styles.button__text}>{children}</span>
			{arrow && (
				<div className={styles.button__icon}>
					<Image
						src={getOptimizedImageUrl(
							'/images/icons/arrow-right.svg',
							{ width: 28, height: 28, quality: 90 }
						)}
						alt="Arrow right"
						width={28}
						height={28}
					/>
				</div>
			)}
		</button>
	)
}

export default Button
