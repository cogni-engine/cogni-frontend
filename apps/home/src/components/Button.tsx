'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps & {
  as?: 'button';
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

type ButtonAsLink = ButtonBaseProps & {
  as: 'link';
  href: string;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-slate-950 hover:bg-white/80 hover:text-slate-950 focus-visible:outline-white',
  secondary:
    'border border-white/40 bg-transparent text-white hover:border-white focus-visible:outline-white',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children } = props;

  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const classes =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (props.as === 'link') {
    const {
      as: _as,
      href,
      children: linkChildren,
      variant: _variant,
      className: _className,
      ...linkRest
    } = props;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {linkChildren}
      </Link>
    );
  }

  const {
    as: _as = 'button',
    children: buttonChildren,
    variant: _variant,
    className: _className,
    type = 'button',
    ...buttonRest
  } = props;

  return (
    <button type={type} className={classes} {...buttonRest}>
      {buttonChildren}
    </button>
  );
}
