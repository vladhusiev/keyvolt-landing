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
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className,
	arrow = false,
	variant = 'primary',
	type = 'button'
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				styles[`button__${variant}`],
				className,
				arrow && styles.button__hasArrow
			)}
			onClick={onClick}
			type={type}
		>
			<span className={styles.button__text}>{children}</span>
			{arrow && (
				<div className={styles.button__icon}>
					<Image
						src={getOptimizedImageUrl(
							'/images/icons/arrow-right.svg',
							28,
							28,
							90
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
