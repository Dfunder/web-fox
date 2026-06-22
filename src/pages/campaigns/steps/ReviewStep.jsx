import { useSelector } from 'react-redux';
import { selectDraftCampaign } from '../../../features/campaigns/campaignsSlice';

const FIELDS = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description' },
  { key: 'goalAmount', label: 'Funding Goal (XLM)' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'coverImageUrl', label: 'Cover Image URL' },
];

const ReviewStep = () => {
  const draft = useSelector(selectDraftCampaign);

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Review your campaign details before submitting.
      </p>
      <dl className="divide-y divide-slate-100 rounded-lg border border-slate-200">
        {FIELDS.map((field) => (
          <div key={field.key} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="text-sm font-medium text-slate-500">{field.label}</dt>
            <dd className="break-words text-sm text-slate-900 sm:col-span-2">
              {draft[field.key] || <span className="text-slate-400">Not provided</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ReviewStep;
