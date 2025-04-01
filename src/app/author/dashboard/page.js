'use client';

import { useEffect, useState } from 'react';
import CreateNewsForm from '@/components/CreateNewsForm';
import MyDraftsList from '@/components/MyDraftsList';

export default function AuthorDashboard() {
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('create'); // ✅ track current view

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    setUserId(storedId);
  }, []);

  if (!userId) return <p className="p-4">Loading...</p>;

  return (
    <div className="pt-28 p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white-600">📝 Author Dashboard</h1>

      {/* ✅ Tab Navigation Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'create'
              ? 'bg-green-600 text-white cursor-pointer'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          ✍️ Create Draft
        </button>

        <button
          onClick={() => setActiveTab('drafts')}
          className={`px-4 py-2 rounded-md cursor-pointer font-medium ${
            activeTab === 'drafts'
              ? 'bg-green-600 text-white cursor-pointer'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          📋 My Drafts
        </button>
      </div>

      {/* ✅ Conditional View */}
      {activeTab === 'create' ? (
        <CreateNewsForm userId={userId} />
      ) : (
        <MyDraftsList userId={userId} />
      )}
    </div>
  );
}
