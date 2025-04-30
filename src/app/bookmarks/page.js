import BookmarkList from "@/components/BookmarkList";

export default function BookmarksPage() {
  return (
    <div className="min-h-screen px-4 py-16 bg-[#0c0f1a]">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        🔖 My Bookmarked Articles
      </h1>
      <BookmarkList />
    </div>
  );
}
