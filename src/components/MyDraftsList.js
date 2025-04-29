'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function MyDraftsList({ userId }) {
  const [drafts, setDrafts] = useState([]);
  const [tokenReady, setTokenReady] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  // Load token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setTokenReady(true);
  }, []);

  // Fetch draft news
  const fetchDrafts = async () => {
    if (!token || !userId) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/user/${userId}?status=DRAFT`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();

        // ✅ Normalize MongoDB ObjectId
        const normalized = data.map((d) => ({
          ...d,
          id: d._id?.$oid || d._id,
        }));

        setDrafts(normalized);
      } else {
        console.error('❌ Failed to fetch drafts');
      }
    } catch (err) {
      console.error('🚨 Error fetching drafts:', err);
    }
  };

  useEffect(() => {
    if (userId && tokenReady) fetchDrafts();
  }, [userId, tokenReady]);

  const handleDelete = async (slug) => {
    console.log('🗑️ Attempting to delete news with slug:', slug);
    if (!token || !slug) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/slug/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      toast.success('✅ Deleted successfully');
      fetchDrafts();
    } else {
      const msg = await res.text();
      console.error('❌ Delete failed:', msg);
      toast.error('❌ Failed to delete: ' + msg);
    }
  };

  const handleEdit = (slug) => {
    router.push(`/author/edit/${slug}`);
  };

  if (!tokenReady) return null;

  return (
    <div className="space-y-4">
      {drafts.length === 0 ? (
        <p>No drafts yet.</p>
      ) : (
        drafts.map((draft, index) => (
          <div key={draft.id || index} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{draft.title}</h3>
            <p className="text-sm text-gray-500">By: {draft.authorName}</p>
            <p className="mt-2">{draft.content?.slice(0, 100)}...</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(draft.slug)}
                className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(draft.slug)}
                className="bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
