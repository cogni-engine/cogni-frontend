import { AlertTriangle } from 'lucide-react';

type ErrorAlertProps = {
  error: string;
};

export function ErrorAlert({ error }: ErrorAlertProps) {
  return (
    <div className='mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3'>
      <AlertTriangle className='h-5 w-5 text-red-300 shrink-0 mt-0.5' />
      <p className='text-red-300 text-sm'>{error}</p>
    </div>
  );
}
