import { useCallback, useMemo } from 'react';
import { useBeforeUnload } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CAMPAIGN_STEPS,
  nextStep,
  prevStep,
  resetCampaignForm,
  selectDraftCampaign,
  selectFormStep,
} from '../../features/campaigns/campaignSlice';
import DetailsStep from './steps/DetailsStep';
import FundingStep from './steps/FundingStep';
import MediaStep from './steps/MediaStep';
import ReviewStep from './steps/ReviewStep';

const STEP_META = [
  { id: 'details', title: 'Campaign Details', Component: DetailsStep },
  { id: 'funding', title: 'Funding Goal', Component: FundingStep },
  { id: 'media', title: 'Media', Component: MediaStep },
  { id: 'review', title: 'Review & Submit', Component: ReviewStep },
];

const hasUnsavedData = (draft) =>
  Object.values(draft).some((value) => String(value).trim() !== '');

const CreateCampaignPage = () => {
  const dispatch = useDispatch();
  const formStep = useSelector(selectFormStep);
  const draft = useSelector(selectDraftCampaign);

  const isDirty = useMemo(() => hasUnsavedData(draft), [draft]);

  // Warn the user before leaving/refreshing the tab when there are unsaved changes.
  useBeforeUnload(
    useCallback(
      (event) => {
        if (isDirty) {
          event.preventDefault();
          event.returnValue = '';
        }
      },
      [isDirty]
    )
  );

  const isFirstStep = formStep === 0;
  const isLastStep = formStep === CAMPAIGN_STEPS.length - 1;
  const { title, Component } = STEP_META[formStep];

  const handleNext = () => dispatch(nextStep());
  const handleBack = () => dispatch(prevStep());

  const handleSubmit = () => {
    // Placeholder submit; integrates with campaign service in a later issue.
    console.log('Submitting campaign draft:', draft);
    dispatch(resetCampaignForm());
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Create Campaign</h1>
        <p className="text-slate-500">Start a new social impact project.</p>
      </div>

      {/* Step progress indicator */}
      <ol className="flex items-center gap-2">
        {STEP_META.map((step, index) => {
          const isComplete = index < formStep;
          const isCurrent = index === formStep;
          return (
            <li key={step.id} className="flex flex-1 items-center gap-2">
              <span
                className={[
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                  isCurrent
                    ? 'bg-accent text-white'
                    : isComplete
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 text-slate-500',
                ].join(' ')}
              >
                {isComplete ? '✓' : index + 1}
              </span>
              {index < STEP_META.length - 1 && (
                <span
                  className={`hidden h-0.5 flex-1 rounded sm:block ${
                    isComplete ? 'bg-green-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-primary">
          Step {formStep + 1}: {title}
        </h2>
        <Component />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirstStep}
          className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Submit Campaign
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateCampaignPage;
