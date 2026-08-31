'use client'

import { resetPassword } from '@/auth/resetPassword';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { resetPasswordSchema } from '@/validators/resetPasswordSchema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const result = resetPasswordSchema.safeParse({ email });

    if (result.success) {
      setEmailError('');
      return true;
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    setEmailError(fieldErrors.email?.[0] || '');
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const result = await resetPassword(email);

    setIsLoading(false);

    if (result.error) {
      setEmailError(result.error);
    } else {
      setEmailSent(true);
      toast.success('Письмо для восстановления пароля отправлено!');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  if (emailSent) {
    return (
      <>
        <Header />
        <main className="pt-[85px] min-h-screen bg-[#f8fafc] px-4 md:px-10 lg:px-40 py-10">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-[#0d171b] mb-2">
                Письмо отправлено!
              </h1>
              <p className="text-[#4c809a] mb-6">
                Мы отправили инструкции по восстановлению пароля на <strong>{email}</strong>
              </p>

              <div className="space-y-4">
                <p className="text-sm text-[#4c809a]">
                  Проверьте папку "Спам", если не видите письмо во входящих.
                </p>

                <Link
                  href="/login"
                  className="block w-full bg-[#0d98ba] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d98ba] transition-colors"
                >
                  Вернуться к входу
                </Link>

                <button
                  onClick={() => setEmailSent(false)}
                  className="text-sm text-[#0d98ba] hover:underline"
                >
                  Отправить письмо повторно
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-[85px] min-h-screen bg-[#f8fafc] px-4 md:px-10 lg:px-40 py-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            {/* Back Button */}
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-[#4c809a] hover:text-[#0d98ba] mb-6 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к входу
            </Link>

            <h1 className="text-3xl font-bold text-[#0d171b] mb-2">
              Forgot Password?
            </h1>
            <p className="text-[#4c809a] mb-8">
              Введите ваш email, и мы отправим инструкции по восстановлению пароля
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4c809a] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                    emailError
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba]'
                  }`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0d98ba] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d98ba] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Отправка...' : 'Отправить инструкции'}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-[#4c809a]">
              Нет аккаунта?{' '}
              <Link href="/sign-up" className="text-[#0d98ba] hover:underline font-medium">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;