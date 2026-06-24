import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../../services/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock('../../utils/toast', () => ({
    toastSuccess: vi.fn(),
    toastError: vi.fn(),
    toastInfo: vi.fn(),
    toastLoading: vi.fn(),
}));

import api from '../../services/api';
import campaignsReducer, {
    setFormStep,
    nextStep,
    prevStep,
    updateDraft,
    clearDraft,
    clearCurrentCampaign,
    clearCampaignsError,
    selectFormStep,
    selectDraftCampaign,
    CAMPAIGN_STEPS,
} from './campaignsSlice';
import {
    createCampaign,
    updateCampaign,
    deleteCampaign,
    submitCampaign,
    fetchMyCampaigns,
    fetchCampaignById,
} from './campaignsThunks';
import { toastSuccess, toastError } from '../../utils/toast';

// Real store so thunks are dispatched through middleware and execute their
// payload creators (awaiting the action creator directly does not run them).
const makeStore = () => configureStore({ reducer: { campaigns: campaignsReducer } });

describe('campaignsSlice', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('initial state', () => {
        it('matches the Issue #85 spec shape', () => {
            const state = campaignsReducer(undefined, { type: '@@INIT' });
            expect(state).toEqual({
                campaigns: [],
                currentCampaign: null,
                draftCampaign: {
                    title: '',
                    category: '',
                    description: '',
                    fullStory: '',
                    goalAmount: '',
                    deadline: '',
                    coverImageUrl: '',
                },
                formStep: 1,
                isLoading: false,
                error: null,
            });
        });

        it('exposes CAMPAIGN_STEPS in the expected visual order', () => {
            expect(CAMPAIGN_STEPS).toEqual(['details', 'funding', 'media', 'review']);
        });
    });

    describe('synchronous reducers', () => {
        const seeded = {
            campaigns: [],
            currentCampaign: null,
            draftCampaign: {
                title: 'Old',
                category: 'Old',
                description: '',
                fullStory: '',
                goalAmount: '',
                deadline: '',
                coverImageUrl: '',
            },
            formStep: 2,
            isLoading: false,
            error: null,
        };

        it('setFormStep updates to a valid 1-indexed step', () => {
            const result = campaignsReducer(seeded, setFormStep(3));
            expect(result.formStep).toBe(3);
        });

        it('setFormStep ignores values below 1 or above the max step', () => {
            expect(campaignsReducer(seeded, setFormStep(0)).formStep).toBe(2);
            expect(campaignsReducer(seeded, setFormStep(-1)).formStep).toBe(2);
            expect(
                campaignsReducer(seeded, setFormStep(CAMPAIGN_STEPS.length + 1)).formStep
            ).toBe(2);
            expect(
                campaignsReducer(seeded, setFormStep('not-a-number')).formStep
            ).toBe(2);
        });

        it('nextStep increments up to the last step and then stops', () => {
            let state = campaignsReducer(seeded, nextStep());
            expect(state.formStep).toBe(3);

            state = campaignsReducer(state, nextStep());
            expect(state.formStep).toBe(CAMPAIGN_STEPS.length);

            state = campaignsReducer(state, nextStep());
            expect(state.formStep).toBe(CAMPAIGN_STEPS.length);
        });

        it('prevStep decrements down to 1 and then stops', () => {
            let state = campaignsReducer({ ...seeded, formStep: CAMPAIGN_STEPS.length }, prevStep());
            expect(state.formStep).toBe(CAMPAIGN_STEPS.length - 1);

            while (state.formStep > 1) state = campaignsReducer(state, prevStep());
            expect(state.formStep).toBe(1);

            state = campaignsReducer(state, prevStep());
            expect(state.formStep).toBe(1);
        });

        it('updateDraft merges payload into draftCampaign without losing other fields', () => {
            const result = campaignsReducer(
                seeded,
                updateDraft({ title: 'New Title', goalAmount: '5000' })
            );
            expect(result.draftCampaign.title).toBe('New Title');
            expect(result.draftCampaign.goalAmount).toBe('5000');
            // Untouched fields are preserved
            expect(result.draftCampaign.category).toBe('Old');
            expect(result.draftCampaign.coverImageUrl).toBe('');
        });

        it('clearDraft resets draft to empty and formStep to 1', () => {
            const dirty = {
                ...seeded,
                draftCampaign: {
                    title: 'a',
                    category: 'b',
                    description: 'c',
                    fullStory: 'd',
                    goalAmount: 'e',
                    deadline: 'f',
                    coverImageUrl: 'g',
                },
                formStep: 4,
            };
            const result = campaignsReducer(dirty, clearDraft());
            expect(result.draftCampaign).toEqual({
                title: '',
                category: '',
                description: '',
                fullStory: '',
                goalAmount: '',
                deadline: '',
                coverImageUrl: '',
            });
            expect(result.formStep).toBe(1);
        });

        it('clearCurrentCampaign nulls out currentCampaign', () => {
            const result = campaignsReducer(
                { ...seeded, currentCampaign: { id: 1, title: 'x' } },
                clearCurrentCampaign()
            );
            expect(result.currentCampaign).toBeNull();
        });

        it('clearCampaignsError nulls out error', () => {
            const result = campaignsReducer({ ...seeded, error: 'boom' }, clearCampaignsError());
            expect(result.error).toBeNull();
        });
    });

    describe('inline selectors', () => {
        it('selects formStep and draftCampaign from state', () => {
            const fakeState = {
                campaigns: {
                    formStep: 2,
                    draftCampaign: { title: 'Draft Title' },
                },
            };
            expect(selectFormStep(fakeState)).toBe(2);
            expect(selectDraftCampaign(fakeState).title).toBe('Draft Title');
        });
    });

    describe('extraReducers (reducer transitions via dispatched actions)', () => {
        // We dispatch the thunks through a real store and assert on the
        // resulting fulfilled/rejected/pending outcomes and state.

        it('createCampaign: pending → loading=true/error cleared; fulfilled → campaign stored', async () => {
            api.post.mockResolvedValueOnce({ data: { id: 7, title: 'New' } });
            const store = makeStore();
            await store.dispatch(createCampaign({ title: 'New' }));

            const state = store.getState().campaigns;
            expect(state.isLoading).toBe(false);
            expect(state.campaigns).toContainEqual({ id: 7, title: 'New' });
            expect(state.currentCampaign).toEqual({ id: 7, title: 'New' });
            expect(api.post).toHaveBeenCalledWith('/campaigns', { title: 'New' });
            expect(toastSuccess).toHaveBeenCalledWith('Campaign created');
        });

        it('createCampaign: rejected → error recorded and toast fired', async () => {
            api.post.mockRejectedValueOnce({
                response: { data: { message: 'Bad payload' } },
            });
            const store = makeStore();
            const action = await store.dispatch(createCampaign({}));

            expect(action.meta.requestStatus).toBe('rejected');
            const state = store.getState().campaigns;
            expect(state.isLoading).toBe(false);
            expect(state.error).toEqual({ message: 'Bad payload' });
            expect(toastError).toHaveBeenCalled();
        });

        it('updateCampaign: fulfilled replaces the matching campaign in the list', async () => {
            api.post.mockResolvedValueOnce({ data: { id: 2, title: 'Old' } });
            const store = makeStore();
            await store.dispatch(createCampaign({ title: 'Old' }));

            api.put.mockResolvedValueOnce({ data: { id: 2, title: 'Updated' } });
            await store.dispatch(updateCampaign({ id: 2, title: 'Updated' }));

            const state = store.getState().campaigns;
            expect(state.campaigns).toContainEqual({ id: 2, title: 'Updated' });
            expect(state.currentCampaign).toEqual({ id: 2, title: 'Updated' });
            expect(api.put).toHaveBeenCalledWith('/campaigns/2', { title: 'Updated' });
        });

        it('updateCampaign: rejected when id is missing sets a fallback error', async () => {
            const store = makeStore();
            const action = await store.dispatch(updateCampaign({ title: 'oops' }));

            expect(action.meta.requestStatus).toBe('rejected');
            expect(action.payload).toMatch(/id is required/);
        });

        it('deleteCampaign: fulfilled removes the campaign and clears current when matched', async () => {
            api.post.mockResolvedValueOnce({ data: { id: 1, title: 'A' } });
            const store = makeStore();
            await store.dispatch(createCampaign({ title: 'A' }));
            expect(store.getState().campaigns.campaigns).toHaveLength(1);

            api.delete.mockResolvedValueOnce({});
            await store.dispatch(deleteCampaign(1));

            const state = store.getState().campaigns;
            expect(state.campaigns).toEqual([]);
            expect(state.currentCampaign).toBeNull();
            expect(toastSuccess).toHaveBeenCalledWith('Campaign deleted');
        });

        it('submitCampaign: fulfilled clears draft and resets formStep; creates then submits when given a draft', async () => {
            api.post
                .mockResolvedValueOnce({ data: { id: 50 } })
                .mockResolvedValueOnce({ data: { id: 50, status: 'submitted' } });

            const store = makeStore();
            const action = await store.dispatch(submitCampaign({ title: 'Hey', category: 'Education' }));

            expect(api.post).toHaveBeenNthCalledWith(
                1,
                '/campaigns',
                { title: 'Hey', category: 'Education' },
            );
            expect(api.post).toHaveBeenNthCalledWith(2, '/campaigns/50/submit');
            expect(action.payload).toEqual({ id: 50, status: 'submitted' });

            const state = store.getState().campaigns;
            expect(state.draftCampaign).toEqual({
                title: '',
                category: '',
                description: '',
                fullStory: '',
                goalAmount: '',
                deadline: '',
                coverImageUrl: '',
            });
            expect(state.formStep).toBe(1);
            expect(state.campaigns).toContainEqual({ id: 50, status: 'submitted' });
        });

        it('submitCampaign: rejected surfaces the error message', async () => {
            api.post.mockRejectedValueOnce({
                response: { data: { message: 'Cannot submit' } },
            });
            const store = makeStore();
            const action = await store.dispatch(submitCampaign(7));

            expect(action.meta.requestStatus).toBe('rejected');
            expect(store.getState().campaigns.error).toEqual({ message: 'Cannot submit' });
            expect(toastError).toHaveBeenCalled();
        });

        it('fetchMyCampaigns: fulfilled replaces the campaigns list', async () => {
            api.get.mockResolvedValueOnce({ data: [{ id: 10 }, { id: 20 }] });
            const store = makeStore();
            await store.dispatch(fetchMyCampaigns());

            const state = store.getState().campaigns;
            expect(state.campaigns).toEqual([{ id: 10 }, { id: 20 }]);
            expect(state.isLoading).toBe(false);
        });

        it('fetchMyCampaigns: rejected surfaces the error and does not mutate campaigns', async () => {
            api.get.mockRejectedValueOnce({
                response: { data: { message: 'Server down' } },
            });
            const store = makeStore();
            const action = await store.dispatch(fetchMyCampaigns());

            expect(action.meta.requestStatus).toBe('rejected');
            const state = store.getState().campaigns;
            expect(state.campaigns).toEqual([]);
            expect(state.error).toEqual({ message: 'Server down' });
            expect(toastError).toHaveBeenCalled();
        });

        it('fetchCampaignById: fulfilled sets currentCampaign and merges into the list', async () => {
            api.get.mockResolvedValueOnce({ data: { id: 5, title: 'Fetched' } });
            const store = makeStore();
            await store.dispatch(fetchCampaignById(5));

            const state = store.getState().campaigns;
            expect(state.currentCampaign).toEqual({ id: 5, title: 'Fetched' });
            expect(state.campaigns).toContainEqual({ id: 5, title: 'Fetched' });
        });

        it('fetchCampaignById: rejected when id is missing sets a fallback error', async () => {
            const store = makeStore();
            const action = await store.dispatch(fetchCampaignById());

            expect(action.meta.requestStatus).toBe('rejected');
            expect(action.payload).toMatch(/id is required/);
        });

        it('fetchCampaignById: rejected with server error surfaces the message', async () => {
            api.get.mockRejectedValueOnce({
                response: { data: { message: 'Not found' } },
            });
            const store = makeStore();
            await store.dispatch(fetchCampaignById(99));

            expect(store.getState().campaigns.error).toEqual({ message: 'Not found' });
            expect(toastError).toHaveBeenCalled();
        });
    });
});
