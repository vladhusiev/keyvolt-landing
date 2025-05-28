import { z } from "zod";

export const feedbackSchema = z.object({
	firstName: z.string().min(2, '2 symbols min'),
	lastName: z.string().min(2, '2 symbols min'),
	phone: z.string().min(9, 'Enter correct phone number'),
	company: z
		.string()
		.min(2, 'Enter company name'),
	message: z
		.string()
		.min(10, 'Message must be at least 10 characters long')
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>; 