import { z } from "zod";

export const resetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'Email обязателен для заполнения')
        .email('Введите корректный email адрес')
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>