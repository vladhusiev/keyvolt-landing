import { getOptimizedImageUrl } from '@/app/utlis/image-optimization'
import clsx from 'clsx'
import Image from 'next/image'
import styles from './title.module.css'

interface TitleProps {
	children: React.ReactNode
	className?: string
	decorator?: boolean
}

const Title: React.FC<TitleProps> = ({
	children,
	decorator = true,
	className
}) => {
	return (
		<div className={clsx(styles.titleWrap)}>
			{decorator && (
				<span className={styles.titleLine}>
					<Image
						src={getOptimizedImageUrl(
							'/images/icons/zap.svg',
							24,
							24,
							90
						)}
						alt=""
						width={24}
						height={24}
					/>
				</span>
			)}
			<h2 className={clsx(styles.title, className)}>{children}</h2>
		</div>
	)
}

export default Title
