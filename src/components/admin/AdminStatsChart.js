'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#007bff', '#28a745', '#ffc107', '#dc3545'];

export default function AdminStatsChart({ data }) {
  const roleData = [
    { name: 'Readers', value: data.readers },
    { name: 'Authors', value: data.authors },
    { name: 'Editors', value: data.editors },
    { name: 'Admins', value: data.admins },
  ];

  const newsData = [
    { name: 'Drafts', value: data.drafts },
    { name: 'Published', value: data.published },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-10 mt-10">
      {/* Role Distribution Pie */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-blue-800">User Role Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={roleData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {roleData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* News Status Pie */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-green-800">News Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={newsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {newsData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
