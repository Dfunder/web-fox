import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom typed dispatch hook.
 * Use this throughout the app instead of plain `useDispatch`.
 */
export const useAppDispatch = useDispatch;

/**
 * Custom typed selector hook.
 * Use this throughout the app instead of plain `useSelector`.
 */
export const useAppSelector = useSelector;
