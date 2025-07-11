import { z } from "zod";

export const contactSchema = z.object({
	firstName: z.string().min(2, "Мінімум 2 символи"),
	lastName: z.string().min(2, "Мінімум 2 символи"),
	phone: z.string().min(9, "Введіть коректний номер телефону"),
	company: z.string().min(2, "Введіть назву компанії"),
	message: z.string().min(10, "Повідомлення має містити мінімум 10 символів"),
	recaptchaToken: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactSchema>; 