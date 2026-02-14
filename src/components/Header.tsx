'use client'

import { useAuth } from '@/auth/AuthContext';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const isActiveRoute = (path: string): boolean => {
    return pathname === path;
  };

  const getLinkClassName = (path: string): string => {
    const baseClasses = "text-sm font-medium leading-normal transition-all duration-300 relative";
    const activeClasses = "text-[#0d98ba]";
    const inactiveClasses = "text-[#64748b] hover:text-[#0f172a]";

    return `${baseClasses} ${isActiveRoute(path) ? activeClasses : inactiveClasses}`;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/compare', label: 'Compare Cities' },
    { href: '/budget', label: 'Budget Planner' },
    { href: '/scholarships', label: 'Scholarships' },
    { href: '/community', label: 'Community' },
  ];

  if (loading || !user) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-[#e2e8f0] shadow-sm'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.svg"
                  alt="STAB Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <Link
                href="/"
                className="text-[#0f172a] text-xl font-bold tracking-tight hover:text-[#0d98ba] transition-colors duration-300"
              >
                STAB
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getLinkClassName(link.href)}
                >
                  {link.label}
                  {isActiveRoute(link.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0d98ba] rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Plan Journey CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/plan-journey"
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#0d98ba] text-white text-sm font-semibold rounded-xl hover:bg-[#0b8299] hover:shadow-lg transition-all duration-300"
                >
                  <span>Plan My Journey</span>
                </Link>
              </motion.div>

              {/* Profile / Login */}
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/profile"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d98ba] text-white font-bold text-sm ring-2 ring-[#0d98ba]/20 hover:ring-[#0d98ba]/50 transition-all duration-300 overflow-hidden"
                    title={user.user_metadata?.name || user.email || 'Profile'}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{(user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase()}</span>
                    )}
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/login"
                    className="px-5 py-2.5 bg-white text-[#0f172a] text-sm font-semibold rounded-xl border border-[#e2e8f0] hover:border-[#0d98ba] hover:text-[#0d98ba] transition-all duration-300"
                  >
                    Login
                  </Link>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white border border-[#e2e8f0]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="w-5 h-0.5 bg-[#0f172a] rounded-full"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-[#0f172a] rounded-full"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-[#0f172a] rounded-full"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 md:top-20 z-40 lg:hidden"
          >
            <div className="bg-white/95 backdrop-blur-xl border-b border-[#e2e8f0] shadow-xl">
              <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl transition-all duration-300 ${isActiveRoute(link.href)
                          ? 'bg-[#0d98ba]/10 text-[#0d98ba]'
                          : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                  className="mt-4 pt-4 border-t border-[#e2e8f0]"
                >
                  <Link
                    href="/plan-journey"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 bg-[#0d98ba] text-white text-center font-semibold rounded-xl"
                  >
                    Plan My Journey
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
