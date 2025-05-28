'use client'

import { sendFeedbackAction } from '@/app/actions/feedback-actions'
import { useActionState, useEffect, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { SuccessModal } from '../success-modal'

const INITIAL_STATE = {
	message: '',
	zodErrors: null,
	strapiErrors: null,
	formData: null
}

export const FeedbackForm = () => {
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [formState, formAction] = useActionState(
		sendFeedbackAction,
		INITIAL_STATE
	)

	const zodErrors = formState?.zodErrors
	const strapiErrors = formState?.strapiErrors?.message
	const successMessage = formState?.successMessage

	useEffect(() => {
		if (formState?.status === 200) {
			setIsSuccessModalOpen(true)
		}
	}, [formState?.status])

	return (
		<>
			<form
				action={formAction}
				className="max-w-md mx-auto p-6 space-y-4"
			>
				<div>
					<label
						htmlFor="firstName"
						className="block text-sm font-medium text-gray-700"
					>
						Имя
					</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{zodErrors?.firstName && (
						<p className="mt-1 text-sm text-red-600">
							{zodErrors?.firstName}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="lastName"
						className="block text-sm font-medium text-gray-700"
					>
						Фамилия
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{zodErrors?.lastName && (
						<p className="mt-1 text-sm text-red-600">
							{zodErrors?.lastName}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700"
					>
						Телефон
					</label>
					<IMaskInput
						mask="+38(000) 000-00-00"
						unmask={true}
						name="phone"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						placeholder="+38(___) ___-__-__"
					/>
					{zodErrors?.phone && (
						<p className="mt-1 text-sm text-red-600">
							{zodErrors?.phone}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="company"
						className="block text-sm font-medium text-gray-700"
					>
						Компания
					</label>
					<input
						type="text"
						id="company"
						name="company"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{zodErrors?.company && (
						<p className="mt-1 text-sm text-red-600">
							{zodErrors?.company}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700"
					>
						Сообщение
					</label>
					<textarea
						id="message"
						name="message"
						rows={4}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{zodErrors?.message && (
						<p className="mt-1 text-sm text-red-600">
							{zodErrors?.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Отправить
				</button>
				{strapiErrors && <p>{strapiErrors}</p>}
				{successMessage && <p>{successMessage}</p>}
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
