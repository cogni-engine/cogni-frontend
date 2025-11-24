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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // ESCキーでメニューを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // メニュー項目クリックでメニューを閉じる
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className='fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05060b]/80 backdrop-blur-xl'>
        <div className='mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4'>
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
          <nav className='hidden items-center gap-6 lg:flex'>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className='text-sm text-slate-300 transition hover:text-white'
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className='ml-auto flex items-center gap-6 text-sm text-slate-300'>
            <LanguageSwitch activeLanguage={language} onChange={setLanguage} />
            <Link
              href={process.env.NEXT_PUBLIC_APP_URL || '#'}
              className='hidden text-slate-300 transition hover:text-white lg:block'
            >
              {copy.navigation.signIn}
            </Link>
            <Link
              href={process.env.NEXT_PUBLIC_APP_URL || '#'}
              className='hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-white/90 lg:block'
            >
              {copy.navigation.getStarted}
            </Link>
            {/* モバイル版: Cognoを始めるボタン */}
            <Link
              href={process.env.NEXT_PUBLIC_APP_URL || '#'}
              className='lg:hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-white/90'
            >
              {copy.navigation.getStarted}
            </Link>
            {/* ハンバーガーメニューボタン */}
            <button
              type='button'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='lg:hidden p-2 text-white hover:text-white/80 transition'
              aria-label='Toggle menu'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-6 h-6'
              >
                <line x1='3' y1='6' x2='21' y2='6' />
                <line x1='3' y1='12' x2='21' y2='12' />
                <line x1='3' y1='18' x2='21' y2='18' />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* モバイルメニューオーバーレイ */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* モバイルメニューパネル */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-[#05060b] border-l border-white/10 transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col flex-1 overflow-y-auto p-6 space-y-6'>
          {/* 閉じるボタン */}
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={() => setIsMobileMenuOpen(false)}
              className='p-2 text-white hover:text-white/80 transition'
              aria-label='Close menu'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-6 h-6'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
          </div>

          {/* ナビゲーション項目 */}
          <nav className='flex flex-col space-y-4'>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className='py-3 text-base text-slate-300 transition hover:text-white'
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 言語切り替え */}
          <div className='pt-4 border-t border-white/10'>
            <LanguageSwitch activeLanguage={language} onChange={setLanguage} />
          </div>
        </div>

        {/* ボタンエリア（一番下に配置） */}
        <div className='p-6 pt-0 space-y-4 border-white/10'>
            {/* 営業担当者に問い合わせるボタン */}
            <Link
              href={copy.cta.secondaryCta.href}
              onClick={handleNavClick}
              className='flex w-full items-center justify-center gap-2 rounded-full bg-black border border-white/20 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80 text-center'
            >
              <span>{copy.cta.secondaryCta.label}</span>
            </Link>

            {/* Cognoを始めるボタン */}
            <Link
              href={process.env.NEXT_PUBLIC_APP_URL || '#'}
              onClick={handleNavClick}
              className='flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-white/80 text-center'
            >
              <span>{copy.navigation.getStarted}</span>
            </Link>
          </div>
        </div>
    </>
  );
}

function Footer() {
  const { copy } = useLanguage();

  return (
    <footer className='border-t border-white/10 bg-[#05060b]'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between'>
        <p>&copy; {new Date().getFullYear()} Cogno. All rights reserved.</p>
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
    <div className='relative hidden lg:block' ref={dropdownRef}>
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
