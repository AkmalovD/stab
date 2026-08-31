'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
    })

    return (
        <>
            <style jsx>{`
                .nav-link {
                    font-size: 20px;
                    padding: 8px 16px;
                    border-radius: 20px;
                    transition: background-color 0.3s ease;
                }
                .nav-link:hover {
                    background-color: rgba(26, 22, 21, 0.05);
                }
                .logo-text {
                    font-size: 24px;
                }
                .logo-image {
                    width: 32px;
                    height: 32px;
                }
                
                /* Optimized navbar container */
                .navbar-container {
                    transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .navbar-container.scrolled {
                    padding-left: 80px;
                    padding-right: 80px;
                    padding-top: 12px;
                    padding-bottom: 12px;
                }
                .navbar-container.not-scrolled {
                    padding-left: 0px;
                    padding-right: 0px;
                    padding-top: 20px;
                    padding-bottom: 20px;
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
                    border-color: rgba(117, 115, 114, 0.15);
                }
                .navbar-inner.not-scrolled {
                    max-width: 1240px;
                    background-color: rgba(255, 255, 255, 0);
                    backdrop-filter: blur(0px);
                    -webkit-backdrop-filter: blur(0px);
                    border-color: rgba(117, 115, 114, 0);
                }
                
                /* Content padding */
                .navbar-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .navbar-content.scrolled {
                    padding: 14px 12px 14px 24px;
                }
                .navbar-content.not-scrolled {
                    padding: 12px 16px 12px 32px;
                }
                
                /* Nav links container */
                .nav-links {
                    display: flex;
                    align-items: center;
                    transition: gap 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    font-size: 18px;
                }
                .nav-links.scrolled {
                    gap: 32px;
                }
                .nav-links.not-scrolled {
                    gap: 28px;
                }
            `}</style>

            {/* Desktop Navbar */}
            <nav
                className={`hidden h-16 lg:block fixed top-0 left-0 right-0 z-50 navbar-container ${isScrolled ? 'scrolled' : 'not-scrolled'}`}
            >
                <div className={`navbar-inner ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
                    <div className={`navbar-content ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
                        {/* Logo */}
                        <div className='flex items-center gap-2'>
                            <div className='logo-image'>
                                <Image
                                    src='/logo.svg'
                                    alt='Logo'
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <span className='logo-text font-semibold text-[#1A1615]'>
                                Dreelio
                            </span>
                        </div>

                        {/* Navigation Links */}
                        <div className={`nav-links ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
                            <Link
                                href='#features'
                                className='nav-link text-[#1A1615] transition-colors font-large'
                            >
                                Features
                            </Link>
                            <Link
                                href='#benefits'
                                className='nav-link text-[#1A1615] transition-colors font-medium'
                            >
                                Benefits
                            </Link>
                            <Link
                                href='#pricing'
                                className='nav-link text-[#1A1615] transition-colors font-medium'
                            >
                                Pricing
                            </Link>
                            <Link
                                href='/blog-page'
                                className='nav-link text-[#1A1615] transition-colors font-medium'
                            >
                                Blog
                            </Link>
                            <Link
                                href='/contact-us'
                                className='nav-link text-[#1A1615] transition-colors font-medium'
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            className={`
                                ${isScrolled ? 'px-7' : 'px-6'} py-3
                                text-base h-[60px]
                                flex items-center justify-center
                                bg-[#1A1615] text-white rounded-full font-medium 
                                hover:bg-[#2A2625] 
                                transition-all duration-500
                            `}
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Try Dreelio free
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar - unchanged */}
            <nav className='lg:hidden sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex items-center gap-2'>
                            <Image
                                src='/logo.svg'
                                alt='Logo'
                                width={28}
                                height={28}
                            />
                            <span className='text-xl font-bold text-[#1A1615]'>Dreelio</span>
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label='Toggle menu'
                            className='p-2 text-[#1A1615]'
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className='border-t border-gray-100 bg-white'
                        >
                            <div className='px-4 py-4 space-y-3'>
                                <Link
                                    href='#features'
                                    className='block py-2 text-[#1A1615] hover:text-gray-600 font-medium'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Features
                                </Link>
                                <Link
                                    href='#benefits'
                                    className='block py-2 text-[#1A1615] hover:text-gray-600 font-medium'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Benefits
                                </Link>
                                <Link
                                    href='#pricing'
                                    className='block py-2 text-[#1A1615] hover:text-gray-600 font-medium'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href='/blog-page'
                                    className='block py-2 text-[#1A1615] hover:text-gray-600 font-medium'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href='/contact-us'
                                    className='block py-2 text-[#1A1615] hover:text-gray-600 font-medium'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact Us
                                </Link>
                                <button className='w-full mt-2 px-6 py-2.5 bg-[#1A1615] text-white rounded-full font-medium hover:bg-[#2A2625] transition-colors'>
                                    Try Dreelio free
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    )
}

export default Navbar