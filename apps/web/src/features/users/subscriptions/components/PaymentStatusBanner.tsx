import { AlertTriangle, XCircle, Info } from 'lucide-react';
import type { Organization } from '@/lib/api/organizationApi';

type PaymentStatusBannerProps = {
  organization: Organization;
};

export function PaymentStatusBanner({
  organization,
}: PaymentStatusBannerProps) {
  const status = organization.status;

  // Only show banner for problematic statuses
  if (
    !status ||
    status === 'active' ||
    status === 'trialing' ||
    status === 'free'
  ) {
    return null;
  }

  const getBannerConfig = () => {
    switch (status) {
      case 'past_due':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/30',
          iconColor: 'text-amber-500',
          title: 'Payment Past Due',
          message:
            'Your most recent payment was unsuccessful. Please update your payment method to avoid service interruption. Your subscription remains active during the grace period.',
          urgency: 'warning' as const,
        };
      case 'canceled':
        return {
          icon: XCircle,
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          iconColor: 'text-red-500',
          title: 'Subscription Canceled',
          message:
            'Your subscription has been canceled. Access to premium features will end at the current billing period. You can reactivate your subscription at any time.',
          urgency: 'error' as const,
        };
      case 'restricted':
        return {
          icon: XCircle,
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          iconColor: 'text-red-500',
          title: 'Account Restricted',
          message:
            'Your account has been temporarily restricted due to a payment dispute. Please contact support to resolve this issue and restore full access.',
          urgency: 'error' as const,
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/30',
          iconColor: 'text-blue-500',
          title: 'Account Status Update',
          message: 'There is an update regarding your subscription status.',
          urgency: 'info' as const,
        };
    }
  };

  const config = getBannerConfig();
  const Icon = config.icon;

  return (
    <div
      className={`mb-6 p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
      role='alert'
      aria-live='polite'
    >
      <div className='flex gap-3'>
        <Icon
          className={`${config.iconColor} flex-shrink-0 mt-0.5`}
          size={20}
        />
        <div className='flex-1'>
          <h4 className={`font-semibold ${config.iconColor} mb-1`}>
            {config.title}
          </h4>
          <p className='text-sm text-white/80 leading-relaxed'>
            {config.message}
          </p>
          {(status === 'past_due' || status === 'restricted') && (
            <button
              className={`mt-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                config.urgency === 'error'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
              onClick={() => {
                // This will be handled by the parent's manage billing handler
                const manageBillingBtn = document.querySelector(
                  '[data-manage-billing]'
                ) as HTMLButtonElement;
                manageBillingBtn?.click();
              }}
            >
              Update Payment Method
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
