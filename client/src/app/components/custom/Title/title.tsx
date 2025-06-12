import Image from 'next/image'
import styles from './title.module.css'

const Title = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.titleWrap}>
			<span className={styles.titleLine}>
				<Image
					src={'/images/icons/zap.svg'}
					alt=""
					width={24}
					height={24}
				/>
			</span>
			<h2 className={styles.title}>{children}</h2>
		</div>
	)
}

export default Title
