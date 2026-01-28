import type { UserOrganizationData } from '@/lib/api/organizationApi';

type SeatUsageMeterProps = {
  organization: UserOrganizationData['organization'];
};

export function SeatUsageMeter({ organization }: SeatUsageMeterProps) {
  const activeCount = organization.active_member_count || 0;
  const seatCount = organization.seat_count || 1;
  const usagePercentage = Math.min((activeCount / seatCount) * 100, 100);
  const availableSeats = seatCount - activeCount;

  const getStatusColor = () => {
    if (usagePercentage >= 100) return 'bg-orange-500';
    if (usagePercentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusTextColor = () => {
    if (usagePercentage >= 100) return 'text-orange-400';
    if (usagePercentage >= 80) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className='mb-6'>
      <div className='flex items-center justify-between mb-2'>
        <p className='text-sm font-medium text-white'>Seat Usage</p>
        <p className='text-sm text-white/60'>
          {activeCount} / {seatCount} seats
        </p>
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-white/10 rounded-full h-3 overflow-hidden'>
        <div
          className={`h-full transition-all duration-300 ${getStatusColor()}`}
          style={{
            width: `${usagePercentage}%`,
          }}
        />
      </div>

      {/* Usage Info */}
      <div className='mt-2 flex items-center justify-between text-xs'>
        <span className='text-white/40'>
          {availableSeats > 0
            ? `${availableSeats} seats available`
            : 'All seats in use'}
        </span>
        <span className={`font-medium ${getStatusTextColor()}`}>
          {Math.round(usagePercentage)}% used
        </span>
      </div>
    </div>
  );
}
