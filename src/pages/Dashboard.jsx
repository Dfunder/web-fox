const STATS = [
  { label: 'Total Raised', value: '12,480 XLM', change: '+8.2%' },
  { label: 'Active Campaigns', value: '6', change: '+2' },
  { label: 'Total Backers', value: '1,204', change: '+114' },
  { label: 'Avg. Donation', value: '42 XLM', change: '+3.1%' },
];

const RECENT_DONATIONS = [
  { id: 1, donor: 'GA3D...K9PL', campaign: 'Clean Water Initiative', amount: '250 XLM', date: '2026-06-20', status: 'Confirmed' },
  { id: 2, donor: 'GB7C...2XQW', campaign: 'School Rebuild Fund', amount: '120 XLM', date: '2026-06-19', status: 'Confirmed' },
  { id: 3, donor: 'GD1M...8RTY', campaign: 'Medical Supplies Drive', amount: '500 XLM', date: '2026-06-19', status: 'Pending' },
  { id: 4, donor: 'GC9F...4ZAA', campaign: 'Clean Water Initiative', amount: '75 XLM', date: '2026-06-18', status: 'Confirmed' },
  { id: 5, donor: 'GE2B...7HJK', campaign: 'Reforestation Project', amount: '300 XLM', date: '2026-06-17', status: 'Failed' },
];

const statusStyles = {
  Confirmed: 'bg-green-100 text-green-700',
  Pending: 'bg-amber-100 text-amber-700',
  Failed: 'bg-red-100 text-red-700',
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-slate-500">Manage your account, donations, and projects.</p>
      </div>

      {/* Stats widgets: 1 column on mobile, 2 on tablet, 4 on desktop */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-primary">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-green-600">{stat.change}</p>
          </div>
        ))}
      </section>

      {/* Recent donations table: horizontally scrollable on small screens */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-primary">Recent Donations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 font-medium">Donor</th>
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_DONATIONS.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 last:border-0">
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-slate-700">{row.donor}</td>
                  <td className="px-5 py-3 text-slate-700">{row.campaign}</td>
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-900">{row.amount}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-500">{row.date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
