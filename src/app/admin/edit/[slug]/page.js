'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditNewsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [news, setNews] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: '',
    keywords: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (slug && token) fetchNews();
  }, [slug, token]);

  const fetchNews = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/news/slug/${slug}`);
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const toastId = toast.loading('Updating news...');
    try {
      const res = await fetch(`http://localhost:8080/api/news/slug/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(news),
      });

      if (res.ok) {
        toast.success('✅ News updated', { id: toastId });
        router.push('/admin/news');
      } else {
        const error = await res.text();
        toast.error('❌ Update failed: ' + error, { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Error updating news', { id: toastId });
    }
  };

  if (loading) return <p className="p-6 text-lg">⏳ Loading news...</p>;

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">📝 Edit News</h1>

      <div className="grid gap-4">
        {/* Title */}
        <label className="text-sm font-medium text-gray-200">Title</label>
        <input
          type="text"
          value={news.title}
          onChange={(e) => setNews({ ...news, title: e.target.value })}
          placeholder="News Title"
          className="p-3 rounded border text-black bg-white"
        />

        {/* Content */}
        <label className="text-sm font-medium text-gray-200">Content</label>
        <textarea
          value={news.content}
          onChange={(e) => setNews({ ...news, content: e.target.value })}
          placeholder="Full content..."
          rows={8}
          className="p-3 rounded border text-black bg-white resize-none"
        />

        {/* Image URL */}
        <label className="text-lg font-bold text-gray-200">Image URL</label>
        <input
          type="text"
          value={news.imageUrl}
          onChange={(e) => setNews({ ...news, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
          className="p-3 rounded border text-black bg-white"
        />

        {/* Preview */}
        {news.imageUrl && (
          <img
            src={news.imageUrl}
            alt="Preview"
            className="rounded w-full max-h-60 object-cover border"
          />
        )}

        {/* Category */}
        <label className="text-sm font-medium text-gray-200">Category</label>
        <input
          type="text"
          value={news.category}
          onChange={(e) => setNews({ ...news, category: e.target.value })}
          placeholder="e.g. politics, sports"
          className="p-3 rounded border text-black bg-white"
        />

        {/* Keywords */}
        <label className="text-sm font-medium text-gray-200">Keywords (comma separated)</label>
        <input
          type="text"
          value={news.keywords}
          onChange={(e) => setNews({ ...news, keywords: e.target.value })}
          placeholder="e.g. government, parliament"
          className="p-3 rounded border text-black bg-white"
        />

        {/* Status */}
        <label className="text-sm font-medium text-gray-200">Status</label>
        <select
          value={news.status}
          onChange={(e) => setNews({ ...news, status: e.target.value })}
          className="p-3 rounded border text-black bg-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        {/* Save Button */}
        <button
          onClick={handleUpdate}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition duration-200"
        >
          💾 Update News
        </button>
      </div>
    </div>
  );
}
