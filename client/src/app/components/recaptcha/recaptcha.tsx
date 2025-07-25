'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './recaptcha.module.css'

interface ReCaptchaProps {
	siteKey: string
	onChange: (token: string | null) => void
	className?: string
	action?: string
}

interface ReCaptchaV3Options {
	action: string
}

declare global {
	interface Window {
		grecaptcha: {
			ready: (callback: () => void) => void
			execute: (
				siteKey: string,
				options: ReCaptchaV3Options
			) => Promise<string>
			render: (
				container: string | HTMLElement,
				options: unknown
			) => number
			reset: (widgetId: number) => void
		}
	}
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({
	siteKey,
	onChange,
	className,
	action = 'submit_form'
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Check key format
		if (siteKey && !siteKey.startsWith('6L')) {
			setError('Invalid reCAPTCHA key format. Key should start with "6L"')
			return
		}

		// Load reCAPTCHA v3 script
		if (!window.grecaptcha) {
			const script = document.createElement('script')
			script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
			script.async = true
			script.defer = true

			script.onload = () => {
				setError(null)
			}

			script.onerror = () => {
				setError('Failed to load reCAPTCHA v3')
			}

			document.head.appendChild(script)

			return () => {
				if (document.head.contains(script)) {
					document.head.removeChild(script)
				}
			}
		}
	}, [siteKey])

	const executeReCaptcha = useCallback(async () => {
		if (!window.grecaptcha || !siteKey) {
			setError('reCAPTCHA not initialized')
			return null
		}

		try {
			setIsLoading(true)
			setError(null)

			const token = await window.grecaptcha.execute(siteKey, { action })

			onChange(token)
			return token
		} catch {
			setError('Error executing reCAPTCHA v3')
			onChange(null)
			return null
		} finally {
			setIsLoading(false)
		}
	}, [siteKey, action, onChange])

	// Export execute function for form usage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			;(
				window as unknown as Window & {
					executeReCaptcha: () => Promise<string | null>
				}
			).executeReCaptcha = executeReCaptcha
		}
	}, [executeReCaptcha])

	if (!siteKey) {
		return (
			<div className={`${styles.recaptcha} ${className || ''}`}>
				<div className={styles.recaptcha__error}>
					reCAPTCHA not configured. Check
					NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className={`${styles.recaptcha} ${className || ''}`}>
				<div className={styles.recaptcha__error}>
					<div className={styles.recaptcha__errorTitle}>
						reCAPTCHA v3 Error:
					</div>
					<div className={styles.recaptcha__errorText}>{error}</div>
					<div className={styles.recaptcha__errorHelp}>
						<strong>Solution:</strong>
						<ul>
							<li>Make sure you created reCAPTCHA v3</li>
							<li>Check that domain is added in settings</li>
							<li>Ensure the key is copied completely</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`${styles.recaptcha} ${className || ''}`}>
			<div className={styles.recaptcha__v3}>
				{isLoading ? (
					<div className={styles.recaptcha__loading}>
						<div className={styles.recaptcha__spinner}></div>
						<span>Security check...</span>
					</div>
				) : (
					<div className={styles.recaptcha__v3Info}>
						<div className={styles.recaptcha__v3Icon}>🛡️</div>
						<span>Protected by reCAPTCHA v3</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default ReCaptcha
