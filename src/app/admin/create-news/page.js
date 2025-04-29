'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminCreateNewsPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [form, setForm] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: '',
    keywords: '',
    status: 'DRAFT'
  });

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const authorName = localStorage.getItem('name');

    const payload = {
      ...form,
      createdBy: userId,
      authorName,
      keywords: form.keywords.split(',').map(k => k.trim())
    };

    const loadingToast = toast.loading('Creating news...');

    try {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('✅ News created successfully', { id: loadingToast });
        router.push('/admin/news');
      } else {
        toast.error('❌ Failed to create news', { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Error creating news', { id: loadingToast });
    }
  };

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white-400 mb-6">✍️ Create News</h1>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="text"
          name="title"
          placeholder="News Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        <textarea
          name="content"
          placeholder="News Content"
          value={form.content}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2 h-40"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. politics, sports)"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="text"
          name="keywords"
          placeholder="Comma-separated keywords"
          value={form.keywords}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        >
          <option value="DRAFT">Save as Draft</option>
          <option value="PUBLISHED">Publish Now</option>
        </select>

        <button
          type="submit"
          className="bg-gray-800 hover:bg-green-700 text-white px-6 py-2 rounded cursor-pointer"
        >
          ➕ Submit News
        </button>
      </form>
    </div>
  );
}