'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [tab, setTab] = useState('draft');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (token) fetchNews(tab);
  }, [tab, token]);

  const fetchNews = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/status/${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNewsList(sorted);
      } else {
        const error = await res.text();
        toast.error(`❌ Failed to load ${status} news`);
        console.error(error);
      }
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Error fetching news');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    const confirmToast = toast.loading('Deleting...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/slug/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success('🗑️ News deleted', { id: confirmToast });
        setNewsList((prev) => prev.filter((n) => n.slug !== slug));
      } else {
        toast.error('❌ Failed to delete', { id: confirmToast });
      }
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Error deleting', { id: confirmToast });
    }
  };

  const filteredNews = newsList.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white-400 mb-6">🗂️ Admin: Manage News</h1>

      {/* 🔘 Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab('draft')}
          className={`px-4 py-2 rounded font-medium transition ${
            tab === 'draft'
              ? 'bg-yellow-500 text-white'
              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
          } cursor-pointer`}
        >
          📝 Draft News
        </button>
        <button
          onClick={() => setTab('published')}
          className={`px-4 py-2 rounded font-medium transition ${
            tab === 'published'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          } cursor-pointer`}
        >
          ✅ Published News
        </button>
      </div>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      />

      {/* 🔄 Content */}
      {loading ? (
        <p>⏳ Loading {tab} news...</p>
      ) : filteredNews.length === 0 ? (
        <p>No matching {tab} news found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredNews.map((n) => (
            <div
              key={n._id || n.slug}
              className="border rounded shadow p-5 bg-gray hover:bg-blue-500 transition cursor-pointer"
            >
              <h2 className="text-xl font-bold text-white-900">{n.title}</h2>
              <p className="text-sm text-white-300 mb-1">
                ✍️ Author: <span className="font-medium">{n.authorName}</span>
              </p>
              <p className="text-white-700 mb-2">
                {n.content.length > 200 ? n.content.slice(0, 200) + '...' : n.content}
              </p>

              <span
                className={`inline-block text-sm font-bold px-2 py-1 rounded mb-3 ${
                  n.status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {n.status.toUpperCase()}
              </span>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => router.push(`/admin/edit/${n.slug}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded cursor-pointer"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(n.slug)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded cursor-pointer"
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