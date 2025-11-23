'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

import { LanguageProvider, useLanguage } from './context/language-context';
import { SECTION_IDS, type Language } from './constants/copy';

type ClientLayoutProps = {
  children: ReactNode;
  initialLanguage: Language;
};

export function ClientLayout({ children, initialLanguage }: ClientLayoutProps) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <div className='flex min-h-screen flex-col bg-[#05060b] text-white'>
        <Header />
        <main className='flex-1 pt-24'>{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

function Header() {
  const { copy, language, setLanguage } = useLanguage();

  const navItems = useMemo(
    () => [
      {
        href: `/#${SECTION_IDS.features}`,
        label: copy.navigation.features,
      },
      {
        href: `/#${SECTION_IDS.solution}`,
        label: copy.navigation.solution,
      },
      { href: '/pricing', label: copy.navigation.pricing },
      { href: '/contact', label: copy.navigation.contact },
    ],
    [copy.navigation]
  );

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05060b]/80 backdrop-blur-xl'>
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4'>
        <Link
          href='/'
          className='flex items-center gap-3 text-2xl font-semibold tracking-wide text-white'
        >
          <Image
            src='/favicon.jpg'
            alt='Cogno'
            width={32}
            height={32}
            className='h-8 w-8'
          />
          Cogno
        </Link>
        <div className='flex items-center gap-6 text-sm text-slate-300'>
          <nav className='hidden items-center gap-6 md:flex'>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className='transition hover:text-white'
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitch activeLanguage={language} onChange={setLanguage} />
          <Link
            href={process.env.NEXT_PUBLIC_APP_URL || '#'}
            className='rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-white/90'
          >
            {copy.navigation.getStarted}
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { copy } = useLanguage();

  return (
    <footer className='border-t border-white/10 bg-[#05060b]'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between'>
        <p>&copy; {new Date().getFullYear()} Cogni. All rights reserved.</p>
        <div className='flex gap-4'>
          <Link href='/privacy' className='transition hover:text-white'>
            {copy.footer.privacy}
          </Link>
          <Link href='/terms' className='transition hover:text-white'>
            {copy.footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}

type LanguageSwitchProps = {
  activeLanguage: 'en' | 'ja';
  onChange: (language: 'en' | 'ja') => void;
};

function LanguageSwitch({ activeLanguage, onChange }: LanguageSwitchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageLabels = {
    en: 'English',
    ja: '日本語',
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 rounded-full p-2 text-slate-300 transition hover:bg-white/5 hover:text-white'
        aria-label='Select language'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='10' />
          <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
          <path d='M2 12h20' />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute right-0 top-full mt-2 w-40 rounded-lg border border-white/10 bg-[#0a0b11] py-1 shadow-xl'>
          <button
            type='button'
            onClick={() => {
              onChange('en');
              setIsOpen(false);
            }}
            className={`flex w-full items-center px-4 py-2 text-sm transition ${
              activeLanguage === 'en'
                ? 'bg-white/10 text-white'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className='mr-2'>🇺🇸</span>
            {languageLabels.en}
          </button>
          <button
            type='button'
            onClick={() => {
              onChange('ja');
              setIsOpen(false);
            }}
            className={`flex w-full items-center px-4 py-2 text-sm transition ${
              activeLanguage === 'ja'
                ? 'bg-white/10 text-white'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className='mr-2'>🇯🇵</span>
            {languageLabels.ja}
          </button>
        </div>
      )}
    </div>
  );
}
