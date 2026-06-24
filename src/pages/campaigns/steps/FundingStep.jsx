import { useDispatch, useSelector } from 'react-redux';
import { selectDraftCampaign, updateDraft } from '../../../features/campaigns/campaignsSlice';

const FundingStep = () => {
  const dispatch = useDispatch();
  const draft = useSelector(selectDraftCampaign);

  const handleChange = (field) => (event) => {
    dispatch(updateDraft({ [field]: event.target.value }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="goalAmount" className="mb-1 block text-sm font-medium text-slate-700">
          Funding Goal (XLM)
        </label>
        <input
          id="goalAmount"
          type="number"
          min="0"
          value={draft.goalAmount}
          onChange={handleChange('goalAmount')}
          placeholder="e.g. 10000"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="deadline" className="mb-1 block text-sm font-medium text-slate-700">
          Campaign Deadline
        </label>
        <input
          id="deadline"
          type="date"
          value={draft.deadline}
          onChange={handleChange('deadline')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        />
      </div>
    </div>
  );
};

export default FundingStep;
