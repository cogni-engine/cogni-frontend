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
    if (usagePercentage >= 80) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  const getStatusTextColor = () => {
    if (usagePercentage >= 100) return 'text-orange-400';
    if (usagePercentage >= 80) return 'text-blue-400';
    return 'text-blue-500';
  };

  return (
    <div className='py-4 border-b border-white/10'>
      <div className='flex items-center justify-between mb-3'>
        <div>
          <div className='text-sm text-white/60 mt-1'>
            {activeCount} of {seatCount} seats used
          </div>
        </div>
        <div className={`text-base font-medium ${getStatusTextColor()}`}>
          {Math.round(usagePercentage)}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-white/10 rounded-full h-2 overflow-hidden'>
        <div
          className={`h-full transition-all duration-300 ${getStatusColor()}`}
          style={{
            width: `${usagePercentage}%`,
          }}
        />
      </div>

      {/* Usage Info */}
      {availableSeats === 0 && (
        <div className='mt-2 text-xs text-orange-400'>
          All seats in use. Update seats to add more members.
        </div>
      )}
    </div>
  );
}
