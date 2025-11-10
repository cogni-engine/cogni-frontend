'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { LanguageProvider, useLanguage } from './context/language-context';
import { SECTION_IDS } from './constants/copy';

type EduLayoutProps = {
  children: ReactNode;
};

export default function EduLayout({ children }: EduLayoutProps) {
  return (
    <LanguageProvider>
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
      { href: `#${SECTION_IDS.solution}`, label: copy.navigation.solution },
      { href: `#${SECTION_IDS.features}`, label: copy.navigation.features },
      { href: `#${SECTION_IDS.howItWorks}`, label: copy.navigation.howItWorks },
      { href: '/contact', label: copy.navigation.contact },
    ],
    [copy.navigation]
  );

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05060b]/80 backdrop-blur-xl'>
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4'>
        <Link
          href='/'
          className='text-2xl font-semibold tracking-wide text-white'
        >
          Cogni Engine
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
  return (
    <div className='flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-medium uppercase tracking-wide text-white'>
      <button
        type='button'
        onClick={() => onChange('en')}
        className={`rounded-full px-3 py-1 transition ${
          activeLanguage === 'en'
            ? 'bg-white text-slate-900'
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        type='button'
        onClick={() => onChange('ja')}
        className={`rounded-full px-3 py-1 transition ${
          activeLanguage === 'ja'
            ? 'bg-white text-slate-900'
            : 'text-white/70 hover:text-white'
        }`}
      >
        日本語
      </button>
    </div>
  );
}
