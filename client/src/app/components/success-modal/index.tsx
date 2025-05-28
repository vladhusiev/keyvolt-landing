'use client'

interface SuccessModalProps {
	isOpen: boolean
	onClose: () => void
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop with animation */}
			<div
				className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
				onClick={onClose}
			/>

			{/* Modal with animation */}
			<div className="flex min-h-full items-center justify-center p-4 text-center">
				<div
					className="relative transform overflow-hidden rounded-lg bg-white p-8 text-left shadow-xl transition-all duration-300 ease-in-out sm:my-8 sm:w-full sm:max-w-md"
					style={{
						animation: 'modalSlideIn 0.3s ease-out'
					}}
				>
					<div className="text-center">
						<div
							className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
							style={{
								animation: 'scaleIn 0.5s ease-out'
							}}
						>
							<svg
								className="h-6 w-6 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h3
							className="text-lg font-medium text-gray-900 mb-2"
							style={{
								animation: 'fadeIn 0.5s ease-out 0.2s both'
							}}
						>
							Сообщение отправлено
						</h3>
						<p
							className="text-sm text-gray-500 mb-6"
							style={{
								animation: 'fadeIn 0.5s ease-out 0.3s both'
							}}
						>
							Спасибо за обратную связь! Мы свяжемся с вами в
							ближайшее время.
						</p>
						<button
							onClick={onClose}
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
							style={{
								animation: 'fadeIn 0.5s ease-out 0.4s both'
							}}
						>
							Закрыть
						</button>
					</div>
				</div>
			</div>

			{/* Animation keyframes */}
			<style jsx global>{`
				@keyframes modalSlideIn {
					from {
						opacity: 0;
						transform: translateY(-20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes scaleIn {
					from {
						transform: scale(0);
					}
					to {
						transform: scale(1);
					}
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
			`}</style>
		</div>
	)
}
