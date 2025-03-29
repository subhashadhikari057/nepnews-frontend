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
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('name');
    setAuthorName(name);
    setTokenReady(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token || !authorName || !userId) {
      toast.error('Missing user information. Please log in again.', { duration: 5000 });
      return;
    }

    const payload = {
      ...formData,
      keywords: formData.keywords
        .split(',')
        .map((kw) => kw.trim())
        .filter((kw) => kw.length > 0),
      authorName,
      status: 'DRAFT',
    };

    const toastId = toast.loading('Saving your draft...');

    try {
      const res = await fetch('http://localhost:8080/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('✅ Draft created successfully!', { id: toastId, duration: 5000 });

        // Clear form
        setFormData({
          title: '',
          content: '',
          imageUrl: '',
          category: '',
          keywords: '',
        });

        // Refresh or redirect
        setTimeout(() => {
          window.location.reload();
        }, 1000); // delay by 2 seconds
        
      } else {
        const errorText = await res.text();
        console.error('❌ Draft creation failed:', errorText);
        toast.error('❌ Failed to create draft. See console for details.', { id: toastId, duration: 5000 });
      }
    } catch (error) {
      console.error('🚨 Error submitting draft:', error);
      toast.error('An unexpected error occurred.', { id: toastId, duration: 5000 });
    }
  };

  if (!tokenReady) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Save as Draft
      </button>
    </form>
  );
}
