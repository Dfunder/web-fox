import { toast } from 'react-hot-toast';

const baseOpts = { duration: 3500 };

const parseMessage = (msg) => {
  if (!msg) return 'Done';
  if (typeof msg === 'string') return msg;
  if (msg?.message) return msg.message;
  if (msg?.response?.data?.message) return msg.response.data.message;
  if (msg?.response?.statusText) return `${msg.response.status} ${msg.response.statusText}`;
  return 'Done';
};

export const toastSuccess = (msg, opts = {}) =>
  toast.success(parseMessage(msg), { ...baseOpts, ...opts });

export const toastError = (msg, opts = {}) =>
  toast.error(parseMessage(msg), { ...baseOpts, ...opts });

export const toastInfo = (msg, opts = {}) =>
  toast(parseMessage(msg), { ...baseOpts, icon: 'ℹ️', ...opts });

export const toastLoading = (msg = 'Loading…', opts = {}) =>
  toast.loading(parseMessage(msg), { ...opts });

export default {
  toastSuccess,
  toastError,
  toastInfo,
  toastLoading,
};
