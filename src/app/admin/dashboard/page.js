'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminStatsChart from '@/components/admin/AdminStatsChart'; // 👈 import it
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          toast.error('❌ Failed to load stats');
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        toast.error('⚠️ Error fetching admin stats');
      }
    };

    if (token) fetchStats();
  }, [token]);

  return (
    <div className="pt-24 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">👑 Admin Dashboard</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Link
          href="/admin/users"
          className="border p-6 rounded-lg shadow hover:shadow-md transition bg-white"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">👥 Manage Users</h2>
          <p className="text-gray-600">View and update roles of all registered users.</p>
        </Link>

        <Link
          href="/admin/news"
          className="border p-6 rounded-lg shadow hover:shadow-md transition bg-white"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📰 Manage News</h2>
          <p className="text-gray-600">View, edit, or delete any news article.</p>
        </Link>

        <Link
          href="/admin/create-news"
          className="border p-6 rounded-lg shadow hover:shadow-md transition bg-white"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📝 Create News</h2>
          <p className="text-gray-600">Write and publish or draft news directly as admin.</p>
        </Link>
      </div>

      {/* ✅ Pie Chart Section */}
      {stats && <AdminStatsChart data={stats} />}
    </div>
  );
}
