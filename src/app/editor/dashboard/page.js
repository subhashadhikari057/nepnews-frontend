'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'; // ✅ Toast added

export default function EditorDashboard() {
  const [drafts, setDrafts] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Custom confirmation toast
  const confirmAction = (message) => {
    return new Promise((resolve) => {
      toast.custom((t) => (
        <div className="bg-white p-4 rounded shadow-md border flex flex-col gap-3 max-w-sm">
          <p className="text-gray-800 font-medium">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              className="px-3 py-1 text-sm rounded border text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      ));
    });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!token) return;

      try {
        const res = await fetch('http://localhost:8080/api/news/status/draft', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setDrafts(data);
        } else {
          toast.error('❌ Failed to fetch drafts');
        }
      } catch (err) {
        toast.error('⚠️ Error fetching drafts');
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, [token]);

  const handlePublish = async (slug) => {
    const confirmed = await confirmAction('Publish this news?');
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8080/api/news/slug/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'PUBLISHED' }),
      });

      if (res.ok) {
        toast.success('✅ Published!');
        setDrafts((prev) => prev.filter((d) => d.slug !== slug));
      } else {
        toast.error('❌ Failed to publish');
      }
    } catch (err) {
      toast.error('⚠️ Error publishing news');
    }
  };

  const handleDelete = async (slug) => {
    const confirmed = await confirmAction('Delete this news?');
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8080/api/news/slug/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success('🗑️ Deleted!');
        setDrafts((prev) => prev.filter((d) => d.slug !== slug));
      } else {
        const msg = await res.text();
        toast.error('❌ Failed to delete: ' + msg);
      }
    } catch (err) {
      toast.error('⚠️ Error deleting news');
    }
  };

  if (loading) return <p className="p-4">⏳ Loading drafts...</p>;

  return (
    <div className="pt-24 p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">📰 Editor Dashboard</h1>

      {drafts.length === 0 ? (
        <p className="text-gray-600">No drafts available for review.</p>
      ) : (
        <div className="grid gap-6">
          {drafts.map((news) => (
            <div key={news._id || news.slug} className="border rounded p-4 shadow-md bg-white">
              <h2 className="text-xl font-semibold text-gray-800">{news.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Author: {news.authorName}</p>
              <p className="text-gray-700 mb-3">
                {news.content.length > 200
                  ? news.content.slice(0, 200) + '...'
                  : news.content}
              </p>

              <div className="flex gap-3 mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => router.push(`/editor/edit/${news.slug}`)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => handlePublish(news.slug)}
                >
                  ✅ Publish
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(news.slug)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
