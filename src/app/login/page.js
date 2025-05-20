'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const contentType = res.headers.get('content-type');
  
      let data = {};
      if (contentType && contentType.includes('application/json')) {
        data = await res.json(); // Safe to parse JSON
      } else {
        const text = await res.text(); // Otherwise, fallback to plain text
        data = { message: text };
      }
  
      if (res.ok && data.token) {
        console.log("🔍 FULL RESPONSE from backend:", data); // ✅ Add here

        // ✅ Successful login
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('role', data.role.toLowerCase());
        localStorage.setItem('userId', data.userId);
        localStorage.setItem("isSubscribed", data.isSubscribed === true ? "true" : "false");

  
        window.dispatchEvent(new Event('userLoggedIn'));
        router.push('/');
      } else {
        if (res.status === 401 || res.status === 403) {
          setMessage(data.message || 'Invalid email or password.');
        } else {
          setMessage(data.message || 'Something went wrong. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT - IMAGE + QUOTE */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/29420755/pexels-photo-29420755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white px-10 text-center">
          <h1 className="text-3xl md:text-2xl font-bold mb-4">
            NepNews — Trusted Nepali news platform bringing you the latest headlines, stories, and analysis.
          </h1>
          <p className="text-base md:text-lg italic">
            “Facts do not cease to exist because they are ignored.”<br />
            <span className="not-italic font-medium">– Aldous Huxley</span>
          </p>
        </div>
      </div>

      {/* RIGHT - LOGIN FORM */}
      <div className="w-full md:w-1/2 bg-[#111] text-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold">Login to NepNews</h1>
            <div className="flex justify-center gap-4 mt-4">
              <button className="p-2 rounded-full border border-gray-600 hover:bg-white/10">f</button>
              <button className="p-2 rounded-full border border-gray-600 hover:bg-white/10">G</button>
              <button className="p-2 rounded-full border border-gray-600 hover:bg-white/10">in</button>
            </div>
            <p className="text-sm text-gray-400 mt-3">or use your email account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#222] border border-gray-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:border-teal-400"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#222] border border-gray-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:border-teal-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-sm text-gray-400 cursor-pointer"
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <p className="text-xs text-right text-gray-400 hover:underline cursor-pointer">
              Forgot your password?
            </p>

            <button
              type="submit"
              className="w-full py-2 text-white font-semibold rounded-full bg-teal-500 hover:bg-teal-600 transition"
            >
              SIGN IN
            </button>

            {message && (
              <p className="text-center text-sm mt-2 text-red-400">{message}</p>
            )}
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-teal-400 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
