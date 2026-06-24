import { useDispatch, useSelector } from 'react-redux';
import { selectDraftCampaign, updateDraft } from '../../../features/campaigns/campaignsSlice';

const CATEGORIES = ['Education', 'Health', 'Environment', 'Disaster Relief', 'Community'];

const DetailsStep = () => {
  const dispatch = useDispatch();
  const draft = useSelector(selectDraftCampaign);

  const handleChange = (field) => (event) => {
    dispatch(updateDraft({ [field]: event.target.value }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          Campaign Title
        </label>
        <input
          id="title"
          type="text"
          value={draft.title}
          onChange={handleChange('title')}
          placeholder="e.g. Clean Water Initiative"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="category"
          value={draft.category}
          onChange={handleChange('category')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          value={draft.description}
          onChange={handleChange('description')}
          placeholder="Tell backers about your campaign..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        />
      </div>
    </div>
  );
};

export default DetailsStep;
