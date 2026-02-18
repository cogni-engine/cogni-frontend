interface SubTextProps {
  children: React.ReactNode;
}

export function SubText({ children }: SubTextProps) {
  return (
    <p className='text-md md:text-xl text-text-secondary max-w-md mx-auto'>
      {children}
    </p>
  );
}
