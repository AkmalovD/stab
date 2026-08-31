import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, 'Имя обязательно для заполнения')
        .min(2, 'Имя должно содержать минимум 2 символа')
        .max(50, 'Имя не может быть длиннее 50 символов'),

    email: z
        .string()
        .min(1, 'Email обязателен для заполнения')
        .email('Введите корректный email адрес'),

    password: z
        .string()
        .min(1, 'Пароль обязателен для заполнения')
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .max(50, 'Пароль не может быть длиннее 50 символов'),

    confirmPassword: z
        .string()
        .min(1, 'Подтвердите пароль'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"]
})

export type RegisterFormData = z.infer<typeof registerSchema>