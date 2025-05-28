'use server'

import { feedbackSchema } from "@/app/schemas/feedback";
import { registerFeedbackService } from "@/app/services/feedback-service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendFeedbackAction(prevState: any, formData: FormData) {
	const data = {
		firstName: formData.get("firstName"),
		lastName: formData.get("lastName"),
		phone: formData.get("phone"),
		company: formData.get("company"),
		message: formData.get("message")
	};

	const validatedFields = feedbackSchema.safeParse(data);
	console.log(validatedFields.error.flatten().fieldErrors);
	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			strapiErrors: null,
			message: "Validation failed"
		};
	}

	const responseData = await registerFeedbackService(validatedFields.data);
	console.log(responseData, validatedFields.data);
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
}
