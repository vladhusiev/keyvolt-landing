'use server'

import { contactSchema } from "@/app/schemas/contact";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendContactAction(prevState: any, formData: FormData) {
	const data = {
		firstName: formData.get("firstName"),
		lastName: formData.get("lastName"),
		phone: formData.get("phone"),
		company: formData.get("company"),
		message: formData.get("message")
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

	// Here you would typically send the data to your backend service
	// For now, we'll simulate a successful submission
	try {
		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		// You can replace this with actual service call
		// const responseData = await registerContactService(validatedFields.data);
		
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
			strapiErrors: { message: "Помилка відправки форми" },
			zodErrors: null,
			message: "Error"
		};
	}
} 