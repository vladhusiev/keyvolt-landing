'use client'

import { useActionState, useEffect, useState } from 'react'
import { IMaskMixin } from 'react-imask'
import { SuccessModal } from '../success-modal'

import clsx from 'clsx'
import FormField from '../form-field/form-field'
import Input from '../input/input'
import Label from '../label/label'

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
	const [formState, formAction] = useActionState(
		sendContactAction,
		INITIAL_STATE
	)
	const formErrors = formState?.zodErrors

	useEffect(() => {
		if (formState?.status === 200) {
			setIsSuccessModalOpen(true)
		}
	}, [formState?.status])

	return (
		<>
			<form action={formAction} className={clsx(styles.form, className)}>
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
				</div>

				<div className={styles.form__footer}>
					<Button type="submit" arrow={true}>
						Відправити
					</Button>

					<span className={styles.form__footerText}>або</span>

					<div className={styles.form__footerSocial}>
						<a
							className={styles.form__footerSocialItem}
							href="viber://chat"
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
							href="https://t.me/"
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
							href="tel:+380931234567"
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
