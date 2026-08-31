import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email обязателен для заполнения')
        .email('Введите корректный email адрес'),

    password: z
        .string()
        .min(1, 'Пароль обязателен для заполнения')
        .min(6, 'Пароль должен содержать минимум 6 символов'),

    rememberMe: z.boolean().optional(),
})



export type LoginFormData = z.infer<typeof loginSchema>