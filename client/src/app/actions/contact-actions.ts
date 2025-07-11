'use server'

import { contactSchema } from "@/app/schemas/contact";
import { registerFeedbackService } from "@/app/services/feedback-service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendContactAction(prevState: any, formData: FormData) {
	const data = {
		firstName: formData.get("firstName"),
		lastName: formData.get("lastName"),
		phone: formData.get("phone"),
		company: formData.get("company"),
		message: formData.get("message"),
		recaptchaToken: formData.get("recaptchaToken")
	};

	const validatedFields = contactSchema.safeParse(data);

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			strapiErrors: null,
			message: "Validation failed"
		};
	}

	// Validate reCAPTCHA v3 token
	const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
	if (recaptchaSecret) {
		try {
			const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					secret: recaptchaSecret,
					response: validatedFields.data.recaptchaToken || '',
				} as Record<string, string>),
			});

			const recaptchaResult = await recaptchaResponse.json();
			
			if (!recaptchaResult.success) {
				return {
					...prevState,
					strapiErrors: { message: "reCAPTCHA verification error" },
					zodErrors: null,
					message: "Error"
				};
			}

			// Check score for reCAPTCHA v3 (0.0 - 1.0, where 1.0 = human)
			const score = recaptchaResult.score || 0;
			const threshold = 0.5; // Minimum threshold to pass

			if (score < threshold) {
				return {
					...prevState,
					strapiErrors: { message: "Suspicious activity. Please try again." },
					zodErrors: null,
					message: "Error"
				};
			}
		} catch {
			return {
				...prevState,
				strapiErrors: { message: "reCAPTCHA verification error" },
				zodErrors: null,
				message: "Error"
			};
		}
	}

	// Prepare data for Strapi (without recaptchaToken)
	const strapiData = {
		firstName: validatedFields.data.firstName,
		lastName: validatedFields.data.lastName,
		phone: validatedFields.data.phone,
		company: validatedFields.data.company,
		message: validatedFields.data.message,
	};

	// Here you would typically send the data to your backend service
	// For now, we'll simulate a successful submission
	try {
		
		// You can replace this with actual service call
		const responseData = await registerFeedbackService(strapiData);
		if (responseData.error) {
			return {
				...prevState,
				strapiErrors: responseData.error,
				zodErrors: null,
				message: "Error"
			};
		}

		return { 
			message: 'Success', 
			status: 200,
			zodErrors: null, 
			strapiErrors: null,
			formData: null 
		};
	} catch {
		return {
			...prevState,
			strapiErrors: { message: "Form submission error" },
			zodErrors: null,
			message: "Error"
		};
	}
} 