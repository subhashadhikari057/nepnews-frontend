'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateNewsForm({ userId }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: '',
    keywords: '',
  });

  const [authorName, setAuthorName] = useState('');
  const [tokenReady, setTokenReady] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('name');
    setAuthorName(name);
    setTokenReady(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 👁️ Update image preview when imageUrl changes
    if (name === 'imageUrl') {
      setPreviewImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token || !authorName || !userId) {
      toast.error('⚠️ Missing user info. Please login again.');
      return;
    }

    const payload = {
      ...formData,
      keywords: formData.keywords
        .split(',')
        .map((kw) => kw.trim())
        .filter(Boolean),
      authorName,
      status: 'DRAFT',
    };

    const toastId = toast.loading('Saving your draft...');

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
        toast.success('✅ Draft saved successfully!', { id: toastId });
        setFormData({
          title: '',
          content: '',
          imageUrl: '',
          category: '',
          keywords: '',
        });
        setPreviewImage('');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        const msg = await res.text();
        console.error('Failed to save draft:', msg);
        toast.error('❌ Failed to save draft.', { id: toastId });
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('🚨 Something went wrong.', { id: toastId });
    }
  };

  if (!tokenReady) return null;

  return (
    <div className="bg-grey shadow-md border border-gray-200 p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { name: 'title', label: 'News Title' },
          { name: 'imageUrl', label: 'Image URL' },
          { name: 'category', label: 'Category' },
          { name: 'keywords', label: 'Keywords (comma separated)' },
        ].map(({ name, label }) => (
          <div key={name}>
            <label htmlFor={name} className="block font-medium text-gray-100 mb-1">
              {label}
            </label>
            <input
              type="text"
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-pink-500 outline-none transition"
              placeholder={label}
              required
            />
          </div>
        ))}

        {/* ✅ Live Preview of Image URL */}
        {previewImage && (
          <div className="mt-2">
            <label className="block text-sm text-gray-400 mb-1">Image Preview:</label>
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-56 rounded border border-gray-300"
            />
          </div>
        )}

        <div>
          <label htmlFor="content" className="block font-medium text-gray-100 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-pink-500 outline-none transition"
            placeholder="Write your news content here..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-medium cursor-pointer"
        >
          💾 Save Draft
        </button>
      </form>
    </div>
  );
}
