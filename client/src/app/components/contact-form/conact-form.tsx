'use client'

import { useActionState, useEffect, useState } from 'react'
import { IMaskMixin } from 'react-imask'
import { SuccessModal } from '../success-modal'

import clsx from 'clsx'
import FormField from '../form-field/form-field'
import Input from '../input/input'
import Label from '../label/label'
import ReCaptcha from '../recaptcha/recaptcha'

import { sendContactAction } from '@/app/actions/contact-actions'
import { Phone } from 'lucide-react'
import Button from '../custom/Button/button'
import { TelegramIcon, ViberIcon } from '../icons'
import Textarea from '../textarea/textarea'
import styles from './contact-form.module.css'

interface ContactFormProps {
	className?: string
}

const INITIAL_STATE = {
	message: '',
	zodErrors: null,
	strapiErrors: null,
	formData: null
}

const MaskedPhoneInput = IMaskMixin(({ inputRef, ...props }) => (
	<Input {...props} ref={inputRef as React.Ref<HTMLInputElement>} />
))

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formState, formAction] = useActionState(
		sendContactAction,
		INITIAL_STATE
	)
	const formErrors = formState?.zodErrors

	useEffect(() => {
		if (formState?.status === 200) {
			setIsSuccessModalOpen(true)
			setIsSubmitting(false)
		}
	}, [formState?.status])

	const handleSubmit = async (formData: FormData) => {
		if (isSubmitting) return

		try {
			setIsSubmitting(true)

			// Execute reCAPTCHA v3
			if (
				typeof window !== 'undefined' &&
				(
					window as unknown as Window & {
						executeReCaptcha: () => Promise<string | null>
					}
				).executeReCaptcha
			) {
				const token = await (
					window as unknown as Window & {
						executeReCaptcha: () => Promise<string | null>
					}
				).executeReCaptcha()
				if (token) {
					formData.append('recaptchaToken', token)
					formAction(formData)
				} else {
					setIsSubmitting(false)
					// Show error to user
					alert('Security check error. Please try again.')
				}
			} else {
				// Fallback if reCAPTCHA is not loaded
				formAction(formData)
			}
		} catch {
			setIsSubmitting(false)
			alert('Form submission error. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<form
				action={handleSubmit}
				className={clsx(styles.form, className)}
			>
				<div className={styles.form__fields}>
					<FormField
						className={styles.form__field}
						error={formErrors?.firstName}
					>
						<Label htmlFor="firstName">Ім&apos;я</Label>
						<Input
							type="text"
							name="firstName"
							id="firstName"
							placeholder="Олександр"
						/>
					</FormField>
					<FormField
						className={styles.form__field}
						error={formErrors?.lastName}
					>
						<Label htmlFor="lastName">Прізвище</Label>
						<Input
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Олександренко"
						/>
					</FormField>

					<FormField
						className={clsx(
							styles.form__field,
							styles.form__fieldPhone
						)}
						error={formErrors?.phone}
					>
						<Label htmlFor="phone">Телефон</Label>
						<MaskedPhoneInput
							mask="+38(000) 000 00 00"
							unmask={true}
							name="phone"
							placeholder="+38 (093) 233 23 23"
						/>
					</FormField>

					<FormField
						className={clsx(
							styles.form__field,
							styles.form__fieldCompany
						)}
						error={formErrors?.company}
					>
						<Label htmlFor="company">Компанія</Label>
						<Input
							type="text"
							name="company"
							id="company"
							placeholder="ТОВ"
						/>
					</FormField>

					<FormField
						className={clsx(
							styles.form__field,
							styles.form__fieldMessage
						)}
						error={formErrors?.message}
					>
						<Label htmlFor="message">Повідомлення</Label>
						<Textarea
							name="message"
							id="message"
							placeholder="Хочу замовити ваші послуги"
						/>
					</FormField>

					<FormField
						className={styles.form__field}
						error={formErrors?.recaptchaToken}
					>
						<ReCaptcha
							siteKey={
								process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
							}
							onChange={() => {}}
							className={styles.form__recaptcha}
							action="contact_form"
						/>
					</FormField>
				</div>

				<div className={styles.form__footer}>
					<Button type="submit" arrow={true} disabled={isSubmitting}>
						{isSubmitting ? 'Відправка...' : 'Відправити'}
					</Button>

					<span className={styles.form__footerText}>або</span>

					<div className={styles.form__footerSocial}>
						<a
							className={styles.form__footerSocialItem}
							href="viber://chat?number=380635103132"
							aria-label="Viber"
						>
							<ViberIcon
								className={styles.form__footerSocialItemIcon}
								width={24}
								height={24}
							/>
						</a>
						<a
							className={styles.form__footerSocialItem}
							href="https://t.me/+380635103132"
							aria-label="Telegram"
						>
							<TelegramIcon
								className={styles.form__footerSocialItemIcon}
								width={24}
								height={24}
							/>
						</a>
						<a
							className={styles.form__footerSocialItem}
							href="tel:+380635103132"
							aria-label="Phone"
						>
							<Phone
								className={styles.form__footerSocialItemIcon}
							/>
						</a>
					</div>
				</div>
			</form>
			<SuccessModal
				isOpen={isSuccessModalOpen}
				onClose={() => {
					setIsSuccessModalOpen(false)
				}}
			/>
		</>
	)
}

export default ContactForm
