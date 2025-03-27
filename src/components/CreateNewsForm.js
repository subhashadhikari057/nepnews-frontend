'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
      alert('Missing user information. Please log in again.');
      return;
    }

    const payload = {
      ...formData,
      keywords: formData.keywords
        .split(',')
        .map((kw) => kw.trim())
        .filter((kw) => kw.length > 0),
      authorName,
      status: 'draft',
    };

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
        alert('✅ Draft created!');
        setFormData({
          title: '',
          content: '',
          imageUrl: '',
          category: '',
          keywords: '',
        });

        // ✅ Refresh page (if on same route)
        window.location.reload();

        // ✅ OR redirect to drafts page:
        // router.push('/author');
      } else {
        const errorText = await res.text();
        console.error('❌ Draft creation failed:', errorText);
        alert('❌ Failed to create draft. See console for details.');
      }
    } catch (error) {
      console.error('🚨 Error submitting draft:', error);
      alert('An unexpected error occurred.');
    }
  };

  if (!tokenReady) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['title', 'imageUrl', 'category', 'keywords'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={formData[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      ))}

      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows="5"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save as Draft
      </button>
    </form>
  );
}
