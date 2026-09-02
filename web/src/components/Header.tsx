'use client'

import { useAuth } from '@/auth/AuthContext';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/compare', label: 'Compare Cities' },
    { href: '/budget', label: 'Budget Planner' },
    { href: '/scholarships', label: 'Scholarships' },
    { href: '/community', label: 'Community' },
  ];

  if (loading) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        .nav-link {
          font-size: 15px;
          padding: 6px 14px;
          border-radius: 20px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .nav-link:hover {
          background-color: rgba(13, 152, 186, 0.08);
        }
        .nav-link.active {
          color: #0d98ba;
          background-color: rgba(13, 152, 186, 0.1);
        }
        .logo-text {
          font-size: 21px;
        }
        .logo-image {
          width: 28px;
          height: 28px;
        }

        /* Optimized navbar container */
        .navbar-container {
          transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .navbar-container.scrolled {
          padding-left: 80px;
          padding-right: 80px;
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .navbar-container.not-scrolled {
          padding-left: 0px;
          padding-right: 0px;
          padding-top: 12px;
          padding-bottom: 12px;
        }

        /* Optimized inner container */
        .navbar-inner {
          transition: max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 40px;
          overflow: hidden;
          border: 1px solid;
          margin: 0 auto;
        }
        .navbar-inner.scrolled {
          max-width: 1100px;
          background-color: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-color: rgba(13, 152, 186, 0.15);
        }
        .navbar-inner.not-scrolled {
          max-width: 1240px;
          background-color: rgba(255, 255, 255, 0);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          border-color: rgba(13, 152, 186, 0);
        }

        /* Content padding */
        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .navbar-content.scrolled {
          padding: 8px 12px 8px 24px;
        }
        .navbar-content.not-scrolled {
          padding: 8px 16px 8px 32px;
        }

        /* Nav links container */
        .nav-links {
          display: flex;
          align-items: center;
          transition: gap 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-links.scrolled {
          gap: 24px;
        }
        .nav-links.not-scrolled {
          gap: 50px;
        }
      `}</style>

      {/* Desktop Navbar */}
      <nav
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 navbar-container ${isScrolled ? 'scrolled' : 'not-scrolled'}`}
      >
        <div className={`navbar-inner ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
          <div className={`navbar-content ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
            {/* Logo */}
            <div className="flex items-center gap-2">
              {/* <div className="logo-image">
                <Image
                  src="/logo.svg"
                  alt="STAB Logo"
                  width={32}
                  height={32}
                />
              </div> */}
              <Link href="/" className="logo-text font-semibold text-[#0f172a] hover:text-[#0d98ba] transition-colors duration-300">
                STAB
              </Link>
            </div>

            {/* Navigation Links */}
            <div className={`nav-links ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link font-medium ${isActiveRoute(link.href) ? 'active text-[#0d98ba]' : 'text-[#64748b]'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side: CTA + Profile */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/plan-journey"
                  className={`${isScrolled ? 'px-6' : 'px-5'} py-2 text-sm h-[44px] flex items-center justify-center bg-[#0d98ba] text-white rounded-full font-medium hover:bg-[#0b8299] transition-all duration-500`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  Plan My Journey
                </Link>
              </motion.div>
              
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0d98ba] text-white font-bold text-xs ring-2 ring-[#0d98ba]/20 hover:ring-[#0d98ba]/50 transition-all duration-300 overflow-hidden"
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
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-[#0f172a] text-sm font-semibold rounded-full border border-[#e2e8f0] hover:border-[#0d98ba] hover:text-[#0d98ba] transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="STAB Logo"
                width={28}
                height={28}
              />
              <Link href="/" className="text-xl font-bold text-[#0f172a]">
                STAB
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {user && (
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0d98ba] text-white font-bold text-xs overflow-hidden"
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
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className="p-2 text-[#0f172a]"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 bg-white"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2.5 px-3 rounded-xl font-medium transition-all duration-300 ${isActiveRoute(link.href)
                      ? 'text-[#0d98ba] bg-[#0d98ba]/10'
                      : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-3 mt-3 border-t border-gray-100">
                  <Link
                    href="/plan-journey"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-6 py-3 bg-[#0d98ba] text-white text-center rounded-full font-medium hover:bg-[#0b8299] transition-colors"
                  >
                    Plan My Journey
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Header;
