'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ isOpen, onClose, featureName }) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0d98ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-[#0d171b]">
                    Требуется авторизация
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#4c809a] hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {featureName && (
                  <div className="bg-[#f8fafc] rounded-xl p-4 border border-gray-100">
                    <p className="text-sm text-[#4c809a]">
                      Чтобы получить доступ к <span className="font-semibold text-[#0d171b]">{featureName}</span>, необходимо войти в систему
                    </p>
                  </div>
                )}

                <div className="bg-[#f8fafc] rounded-xl p-4 border border-gray-100">
                  <p className="text-sm text-[#4c809a] leading-relaxed">
                    Для доступа к полному функционалу платформы, включая сравнение городов, 
                    планирование бюджета, поиск стипендий и общение с сообществом, 
                    необходимо войти в систему.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4c809a] uppercase tracking-wide mb-3">
                    После авторизации вы получите доступ к:
                  </label>
                  <div className="space-y-2">
                    {[
                      'Сравнению городов и расчёту бюджета',
                      'Поиску стипендий и университетов',
                      'Планированию образовательного путешествия',
                      'Общению с другими студентами'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 py-2 px-3 bg-white rounded-lg border border-gray-100">
                        <svg className="w-4 h-4 text-[#0d98ba] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-[#0d171b]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleLogin}
                    className="w-full px-4 py-3 text-sm font-semibold rounded-lg bg-[#0d98ba] text-white hover:bg-[#0d98ba]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0d98ba] focus:ring-opacity-50"
                  >
                    Войти
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="w-full px-4 py-3 text-sm font-semibold rounded-lg bg-white text-[#0d98ba] border border-[#0d98ba]/20 hover:bg-[#0d98ba] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0d98ba] focus:ring-opacity-50"
                  >
                    Регистрация
                  </button>
                </div>

                <div className="text-xs text-[#4c809a] text-center pt-2 border-t border-gray-100">
                  Создавая аккаунт, вы соглашаетесь с нашими условиями использования
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthRequiredModal;
