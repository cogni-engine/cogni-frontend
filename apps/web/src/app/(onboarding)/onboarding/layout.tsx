/**
 * Layout for onboarding pages
 * Simple centered layout with no navigation
 * Uses dark background consistent with app theme
 */

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
      {children}
    </div>
  );
}
