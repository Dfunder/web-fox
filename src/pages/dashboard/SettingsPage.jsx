import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSelectors';
import { setCredentials } from '../../features/auth/authSlice';

const schema = yup.object({
  name: yup.string().trim().required('Full name is required'),
  walletAddress: yup
    .string()
    .trim()
    .required('Wallet address is required')
    .matches(/^G[A-Z2-7]{55}$/, 'Enter a valid Stellar wallet address (G + 55 chars)'),
});

export default function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (user) {
      reset({ name: user.name ?? '', walletAddress: user.walletAddress ?? '' });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    dispatch(setCredentials({ user: { ...user, ...data }, token: undefined }));
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      <p className="text-slate-500 mt-1">Update your profile information.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-50"
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="walletAddress" className="block text-sm font-medium text-slate-700">
            Wallet Address
          </label>
          <input
            id="walletAddress"
            type="text"
            {...register('walletAddress')}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-50"
            placeholder="GABC...XYZ (56 characters)"
          />
          {errors.walletAddress && (
            <p className="mt-1 text-xs text-red-600">{errors.walletAddress.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
