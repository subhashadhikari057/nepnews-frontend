'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditDraftPage() {
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
          const errorText = await res.text();
          console.error('❌ Failed to load draft:', errorText);
        }
      } catch (err) {
        console.error('⚠️ Error fetching draft:', err);
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
        toast.success('✅ Draft updated!');
        router.push('/author/dashboard');
      } else {
        const error = await res.text();
        console.error('❌ Update failed:', error);
        toast.error('❌ Update failed. ' + error);
      }
    } catch (err) {
      console.error('🚨 Update error:', err);
      toast.error('Something went wrong.');
    }
  };

  if (loading || !formData) return <p className="p-4">⏳ Loading draft...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 pt-40">
      <h1 className="text-3xl font-bold mb-4">📝 Edit Your Draft</h1>
      {[
        { name: 'title', label: 'Title' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'category', label: 'Category' },
        { name: 'keywords', label: 'Keywords (comma separated)' },
      ].map(({ name, label }) => (
        <div key={name}>
          <label htmlFor={name} className="block font-medium mb-1">
            {label}:
          </label>
          <input
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder={label}
            required
          />
        </div>
      ))}

      <div>
        <label htmlFor="content" className="block font-medium mb-1">
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="5"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Draft
      </button>
    </form>
  );
}
