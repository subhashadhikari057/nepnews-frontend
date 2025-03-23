'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [tempProfile, setTempProfile] = useState(profile);
  const [suggestedNews, setSuggestedNews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email') || 'Not available';
    const role = localStorage.getItem('role');

    if (!token) {
      router.push('/login');
    } else {
      const newProfile = { name, email, role };
      setProfile(newProfile);
      setTempProfile(newProfile);
    }

    // Fetch suggested news from backend
    fetch('http://localhost:8080/api/news?limit=5&random=true')
      .then(res => res.json())
      .then(data => {
        setSuggestedNews(data);
      })
      .catch(err => console.error('Error fetching suggestions:', err));
  }, [router]);

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem('name', tempProfile.name);
    localStorage.setItem('email', tempProfile.email);
    window.dispatchEvent(new Event('userLoggedIn'));
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('userLoggedIn'));
    router.push('/');
  };

  return (
    <div
      className="min-h-screen px-4 py-10 flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/7130475/pexels-photo-7130475.jpeg?cs=srgb&dl=pexels-codioful-7130475.jpg&fm=jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
        <div
            className="p-8 rounded-xl shadow-lg w-full max-w-lg"
            style={{ backgroundColor: '#bbb36a' }} // light warm yellow
    >
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow">
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>
        </div>

        {/* Profile Info */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Your Profile</h2>
        <div className="space-y-4 text-left">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            {editing ? (
              <input
                type="text"
                value={tempProfile.name}
                onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-800"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            {editing ? (
              <input
                type="email"
                value={tempProfile.email}
                onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-800"
              />
            ) : (
              <p className="text-gray-900">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Role</label>
            <p className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full capitalize">
              {profile.role}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-between">
          {editing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Suggested News */}
      {suggestedNews.length > 0 && (
        <div className="mt-10 w-full max-w-4xl bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Suggested for you</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {suggestedNews.map((news, index) => (
    <Link
      key={index}
      href={`/news/${news.slug}`}
      className="flex flex-col justify-between border-l-4 border-blue-500 bg-blue-50 hover:bg-blue-100 p-4 rounded-md transition h-full"
    >
      <p className="text-gray-900 font-semibold text-base mb-2">{news.title}</p>
      <p className="text-sm text-gray-600">{news.category}</p>
    </Link>
  ))}
</div>

        </div>
      )}
    </div>
  );
}
