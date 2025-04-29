'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditorEditPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchDraft = async () => {
      if (!slug || !token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/slug/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl,
            category: data.category,
            keywords: data.keywords.join(', '),
            status: data.status,
          });
        } else {
          toast.error('❌ Failed to load draft');
        }
      } catch (err) {
        toast.error('⚠️ Error fetching draft');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchDraft();
  }, [slug, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !slug) return;

    const payload = {
      ...formData,
      keywords: formData.keywords
        .split(',')
        .map((kw) => kw.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/slug/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('✅ News updated and published!');
        router.push('/editor/dashboard');
      } else {
        const error = await res.text();
        console.error('❌ Update failed:', error);
        toast.error('❌ Update failed');
      }
    } catch (err) {
      console.error('🚨 Update error:', err);
      toast.error('Something went wrong');
    }
  };

  if (loading || !formData) return <p className="p-4">⏳ Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 pt-24 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Edit & Publish News</h1>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block font-medium mb-1">Title:</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="imageUrl" className="block font-medium mb-1">Image URL:</label>
        <input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block font-medium mb-1">Category:</label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Keywords */}
      <div>
        <label htmlFor="keywords" className="block font-medium mb-1">Keywords (comma separated):</label>
        <input
          id="keywords"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block font-medium mb-1">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Status Selector */}
      <div>
        <label htmlFor="status" className="block font-medium mb-1">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
      >
        💾 Update
      </button>
    </form>
  );
}
