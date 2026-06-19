import { useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../features/auth/authSelectors';
import { uploadAvatar } from '../../features/auth/authThunks';
import { toastError } from '../../utils/toast';

const MAX_SIZE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

function UserInitials({ name }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return (
    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-2xl font-bold select-none">
      {initials}
    </div>
  );
}

export default function AvatarUpload() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toastError('Only JPG and PNG images are accepted.');
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      toastError('Image must be under 2 MB.');
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleCancel() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setSelectedFile(null);
  }

  async function handleConfirm() {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      await dispatch(uploadAvatar(selectedFile)).unwrap();
      handleCancel();
    } catch {
      // toastError is called inside the thunk
    } finally {
      setIsUploading(false);
    }
  }

  const avatarUrl = user?.avatar ?? user?.avatarUrl ?? user?.profile_picture ?? null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Profile Picture</h2>

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleAvatarClick}
          className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-indigo-200 hover:ring-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition group"
          aria-label="Change profile picture"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user?.name ?? 'Avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserInitials name={user?.name} />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </span>
        </button>

        <p className="text-xs text-slate-400">JPG or PNG · max 2 MB</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 flex flex-col items-center gap-5 animate-modal-in">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-base font-semibold text-slate-800">Preview</h3>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isUploading}
                className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                aria-label="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={preview}
              alt="New avatar preview"
              className="w-32 h-32 rounded-full object-cover ring-2 ring-indigo-200"
            />

            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isUploading}
                className="flex-1 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isUploading}
                className="flex-1 py-2 rounded-lg bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Uploading…
                  </>
                ) : (
                  'Upload'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
