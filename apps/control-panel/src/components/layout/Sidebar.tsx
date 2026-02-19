'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Database, Radio, GitBranch } from 'lucide-react';

const navItems = [
  { href: '/tables', label: 'Tables', icon: Database },
  { href: '/realtime', label: 'Realtime', icon: Radio },
  { href: '/pipeline', label: 'Pipeline', icon: GitBranch },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='flex w-56 flex-col border-r border-border bg-surface'>
      <div className='border-b border-border px-4 py-4'>
        <h1 className='text-sm font-semibold text-accent'>Control Panel</h1>
        <p className='mt-0.5 text-xs text-muted'>Supabase Monitor</p>
      </div>
      <nav className='flex-1 p-2'>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-accent-dim text-accent'
                  : 'text-muted hover:bg-surface-hover hover:text-foreground'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
