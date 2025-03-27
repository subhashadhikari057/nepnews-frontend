'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="pt-24 p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">👑 Admin Dashboard</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* 👥 Manage Users */}
        <Link
          href="/admin/users"
          className="border p-6 rounded-lg shadow hover:shadow-md transition bg-white cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">👥 Manage Users</h2>
          <p className="text-gray-600">View and update roles of all registered users.</p>
        </Link>

        {/* 📰 Manage News */}
        <Link
          href="/admin/news"
          className="border p-6 rounded-lg shadow hover:shadow-md transition bg-white cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📰 Manage News</h2>
          <p className="text-gray-600">View, edit, or delete any news article.</p>
        </Link>

        {/* ✍️ Create News */}
        <Link
          href="/admin/create-news"
          className="border p-6 rounded-lg shadow hover:shadow-md transition bg-white cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">✍️ Create News</h2>
          <p className="text-gray-600">Write and publish or draft news directly as admin.</p>
        </Link>
      </div>
    </div>
  );
}
