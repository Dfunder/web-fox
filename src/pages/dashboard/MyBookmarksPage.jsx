import { BookmarkX } from 'lucide-react';
import EmptyState from '../../components/common/EmptyState';

export default function MyBookmarksPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">My Bookmarks</h1>
      <p className="text-slate-500 mt-1">Your bookmarked campaigns will appear here.</p>

      <div className="mt-8">
        <EmptyState
          icon={<BookmarkX className="w-12 h-12 text-slate-300" />}
          title="No bookmarks yet"
          description="You haven't bookmarked any campaigns yet. Browse campaigns and bookmark your favorites."
          actionLabel="Browse Campaigns"
          onAction={() => (window.location.href = '/campaigns')}
        />
      </div>
    </div>
  );
}