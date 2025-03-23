'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const message = await res.text();

      if (res.ok) {
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('name', formData.name);
        localStorage.setItem('email', data.email || formData.email);
        localStorage.setItem('role', 'reader');
        localStorage.setItem('userId', 'dummy-id');

        // 🔔 Dispatch login event for Navbar to update instantly
        window.dispatchEvent(new Event('userLoggedIn'));

        router.push('/');
      } else {
        setMessage(message || 'Signup failed.');
        if (message.toLowerCase().includes('already')) {
          setTimeout(() => router.push('/'), 2000);
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg.png")' }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an account</h2>
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 underline">Log in</Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What should we call you?</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your profile name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What’s your email?</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Create a password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-sm text-gray-600 cursor-pointer"
              >
                {showPassword ? '🙈 Hide' : '👁️ Show'}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Use 8+ characters with letters, numbers & symbols</p>
          </div>

          <p className="text-xs text-gray-600 text-center">
            By creating an account, you agree to the <span className="underline">Terms of use</span> and <span className="underline">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-full transition"
          >
            Create an account
          </button>

          {message && <p className="text-center text-sm text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
