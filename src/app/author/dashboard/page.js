'use client';

import { useEffect, useState } from 'react';
import CreateNewsForm from '@/components/CreateNewsForm';
import MyDraftsList from '@/components/MyDraftsList';

export default function AuthorDashboard() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    setUserId(storedId);
  }, []);

  if (!userId) return <p>Loading...</p>;

  return (
    <div className="pt-30 p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📝 Author Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">✍️ Create News Draft</h2>
        <CreateNewsForm userId={userId} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📋 My Drafts</h2>
        <MyDraftsList userId={userId} />
      </div>
    </div>
  );
}
