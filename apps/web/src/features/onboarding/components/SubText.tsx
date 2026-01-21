interface SubTextProps {
  children: React.ReactNode;
}

export function SubText({ children }: SubTextProps) {
  return (
    <p className='text-md md:text-xl text-gray-300 max-w-md mx-auto'>
      {children}
    </p>
  );
}
