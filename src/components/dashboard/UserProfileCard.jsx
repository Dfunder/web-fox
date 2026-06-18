import { User, Mail, Shield, Wallet } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser, selectAuthLoading } from '../../features/auth/authSelectors';

const KYC_BADGE = {
  verified: { label: 'Verified', className: 'bg-emerald-100 text-emerald-700' },
  pending:  { label: 'Pending',  className: 'bg-amber-100 text-amber-700' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
};

function truncateAddress(addr) {
  if (addr.length <= 16) return addr;
  return `${addr.slice(0, 8)}…${addr.slice(-6)}`;
}

export default function UserProfileCard() {
  const user = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectAuthLoading);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-1/3 mb-5" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 bg-slate-200 rounded flex-shrink-0" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const badge = KYC_BADGE[user?.kycStatus] ?? { label: 'Unverified', className: 'bg-slate-100 text-slate-500' };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Profile</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="text-sm text-slate-700 truncate">{user?.name || '—'}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="text-sm text-slate-700 truncate">{user?.email || '—'}</span>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.className}`}>
            KYC: {badge.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Wallet className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {user?.walletAddress
            ? (
              <span
                className="text-sm font-mono text-slate-700 truncate"
                title={user.walletAddress}
              >
                {truncateAddress(user.walletAddress)}
              </span>
            )
            : <span className="text-sm text-slate-400 italic">No wallet connected</span>
          }
        </div>
      </div>
    </div>
  );
}
