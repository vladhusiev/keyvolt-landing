
interface FeedBackProps {
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  message: string;
}

export async function registerFeedbackService(data: FeedBackProps) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/feedbacks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					phone: data.phone,
					company: data.company,
					message: data.message,
				},
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		return { data: result, error: null };
	} catch {
		return { data: null, error: { message: 'Failed to send feedback' } };
	}
}