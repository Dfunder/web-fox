# Redux Store Configuration

This directory contains the Redux store configuration and global state management logic.

## Folder Structure Convention

We follow a feature-based folder structure for Redux slices. Each domain or feature should have its own directory under `src/features/`.

### Feature Folder Contents

Each feature folder (e.g., `src/features/auth/`) should contain:

1.  **`[feature]Slice.js`**: Defines the Redux slice using `createSlice` from `@reduxjs/toolkit`. It should export the reducer as the default export and any actions as named exports.
2.  **`[feature]Thunks.js`**: Contains async thunks created using `createAsyncThunk` for handling side effects and API calls.
3.  **`[feature]Selectors.js`**: Contains memoized selectors (using `createSelector` if needed) to access specific parts of the feature's state.

## Adding a New Feature

To add a new feature to the Redux store:

1.  Create a new directory in `src/features/` (e.g., `src/features/newFeature/`).
2.  Add the slice, thunks, and selectors files as described above.
3.  Import the new reducer in `src/store/rootReducer.js` and add it to the `combineReducers` call.

## Files in this Directory

- `index.js`: The main store configuration where the `rootReducer` is integrated.
- `rootReducer.js`: Combines all feature-level reducers into a single root reducer.
- `hooks.js`: Custom Redux hooks (`useAppDispatch`, `useAppSelector`) for better TypeScript/linting support.
- `README.md`: This documentation file.
