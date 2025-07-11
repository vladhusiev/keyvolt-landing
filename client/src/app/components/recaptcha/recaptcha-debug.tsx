'use client'

import { useEffect, useState } from 'react'
import styles from './recaptcha.module.css'

interface ReCaptchaDebugProps {
	siteKey: string
}

interface DebugInfo {
	siteKey: string
	siteKeyLength: number
	siteKeyFormat: string
	domain: string
	protocol: string
	fullUrl: string
	userAgent: string
	timestamp: string
	grecaptchaLoaded: string
}

const ReCaptchaDebug: React.FC<ReCaptchaDebugProps> = ({ siteKey }) => {
	const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)

	useEffect(() => {
		const checkReCaptcha = async () => {
			const info: DebugInfo = {
				siteKey: siteKey,
				siteKeyLength: siteKey?.length || 0,
				siteKeyFormat: siteKey?.startsWith('6L')
					? '✅ Correct'
					: '❌ Incorrect',
				domain: window.location.hostname,
				protocol: window.location.protocol,
				fullUrl: window.location.href,
				userAgent: navigator.userAgent,
				timestamp: new Date().toISOString(),
				grecaptchaLoaded: '❌ Not loaded'
			}

			// Check if reCAPTCHA is loaded
			if (window.grecaptcha) {
				info.grecaptchaLoaded = '✅ Loaded'
			}

			setDebugInfo(info)
		}

		checkReCaptcha()
	}, [siteKey])

	if (!debugInfo) {
		return <div>Loading diagnostics...</div>
	}

	return (
		<div className={styles.recaptcha__debug}>
			<h3>reCAPTCHA Diagnostics</h3>
			<div className={styles.recaptcha__debugInfo}>
				<div>
					<strong>Site Key:</strong> {debugInfo.siteKey}
				</div>
				<div>
					<strong>Key Length:</strong> {debugInfo.siteKeyLength}
				</div>
				<div>
					<strong>Key Format:</strong> {debugInfo.siteKeyFormat}
				</div>
				<div>
					<strong>Domain:</strong> {debugInfo.domain}
				</div>
				<div>
					<strong>Protocol:</strong> {debugInfo.protocol}
				</div>
				<div>
					<strong>reCAPTCHA Loaded:</strong>{' '}
					{debugInfo.grecaptchaLoaded}
				</div>
				<div>
					<strong>URL:</strong> {debugInfo.fullUrl}
				</div>
			</div>

			<div className={styles.recaptcha__debugRecommendations}>
				<h4>Recommendations:</h4>
				<ul>
					<li>Make sure you created reCAPTCHA v3</li>
					<li>
						Add domain &quot;{debugInfo.domain}&quot; in reCAPTCHA
						settings
					</li>
					<li>Check that the key is copied completely</li>
					<li>
						Make sure you&apos;re using the correct Site Key (NOT
						Secret Key)
					</li>
				</ul>
			</div>
		</div>
	)
}

export default ReCaptchaDebug
