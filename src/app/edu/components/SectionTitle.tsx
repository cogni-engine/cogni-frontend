'use client';

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`space-y-4 ${alignment}`}>
      {eyebrow ? (
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/70'>
          {eyebrow}
        </p>
      ) : null}
      <h2 className='text-3xl font-bold text-white md:text-4xl'>{title}</h2>
      {description ? (
        <p className='text-base text-slate-300 md:text-lg'>{description}</p>
      ) : null}
    </div>
  );
}
