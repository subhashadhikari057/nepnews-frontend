'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const roles = ['READER', 'AUTHOR', 'EDITOR', 'ADMIN'];

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          toast.error('❌ Failed to fetch users');
        }
      } catch (err) {
        console.error('⚠️ Error:', err);
        toast.error('⚠️ Something went wrong while fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleRoleChange = async (id, newRole) => {
    const loadingToast = toast.loading('Updating role...');

    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}/role?role=${newRole}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success(`✅ Role updated to ${newRole}`, { id: loadingToast });
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
        );
      } else {
        toast.error('❌ Failed to update role', { id: loadingToast });
      }
    } catch (err) {
      console.error('Error updating role:', err);
      toast.error('⚠️ Error updating role', { id: loadingToast });
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <span>
        Are you sure you want to delete this user?
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              actuallyDeleteUser(id);
            }}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-2 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </span>
    ), {
      duration: 10000,
    });
  };

  const actuallyDeleteUser = async (id) => {
    const loadingToast = toast.loading('Deleting user...');

    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success('🗑️ User deleted successfully', { id: loadingToast });
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        toast.error('❌ Failed to delete user', { id: loadingToast });
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('⚠️ Error deleting user', { id: loadingToast });
    }
  };

  if (loading) return <p className="p-4">⏳ Loading users...</p>;

  return (
    <div className="pt-24 p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">👑 Admin: User Management</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border rounded shadow text-left">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Change Role</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id || user._id} className="border-t bg-white hover:bg-gray-50">
                <td className="p-3 text-gray-800 font-medium">{user.name}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 font-bold text-blue-900">{user.role}</td>
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border p-1 rounded text-gray-800 bg-white"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
