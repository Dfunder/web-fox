import { useDispatch, useSelector } from 'react-redux';
import { selectDraftCampaign, updateDraft } from '../../../features/campaigns/campaignsSlice';

const MediaStep = () => {
  const dispatch = useDispatch();
  const draft = useSelector(selectDraftCampaign);

  const handleChange = (field) => (event) => {
    dispatch(updateDraft({ [field]: event.target.value }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="coverImageUrl" className="mb-1 block text-sm font-medium text-slate-700">
          Cover Image URL
        </label>
        <input
          id="coverImageUrl"
          type="url"
          value={draft.coverImageUrl}
          onChange={handleChange('coverImageUrl')}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        />
      </div>

      {draft.coverImageUrl ? (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <img
            src={draft.coverImageUrl}
            alt="Campaign cover preview"
            className="h-48 w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-400">
          Image preview will appear here
        </div>
      )}
    </div>
  );
};

export default MediaStep;
