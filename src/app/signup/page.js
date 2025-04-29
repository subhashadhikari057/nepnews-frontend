'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          password: formData.password
        })
      });

      const message = await res.text();

      if (res.ok) {
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('name', fullName);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('role', 'reader');
        localStorage.setItem('userId', 'dummy-id');
        window.dispatchEvent(new Event('userLoggedIn'));

        setMessage('✅ Successfully registered! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setMessage(message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://w0.peakpx.com/wallpaper/34/44/HD-wallpaper-person-s-right-hand-near-newspaper.jpg')"
      }}
    >
      <div className="w-full max-w-4xl flex bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-10 text-white">
          <h2 className="text-3xl font-extrabold mb-1">Create Your Account<span className="text-blue-500">.</span></h2>
          <p className="text-sm text-gray-300 mb-4">
            Already Have An Account?{' '}
            <Link href="/login" className="text-blue-400 underline">Log In</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="example.email@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-sm text-gray-300 cursor-pointer"
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <div className="text-xs text-gray-300">
              <input type="checkbox" required className="mr-2" />
              I agree to Platform’s <span className="underline text-blue-400">Terms of Service</span> and <span className="underline text-blue-400">Privacy Policy</span>.
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-2 rounded-md"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-300">Or Sign Up with</p>

            <div className="flex justify-center gap-4">
              <button type="button" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-md">G</button>
              <button type="button" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-md">f</button>
              <button type="button" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-md"></button>
            </div>

            {message && (
              <p className={`text-center text-sm mt-2 ${message.startsWith('✅') ? 'text-green-500' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Optional Right Panel (empty or decorative) */}
        <div className="hidden md:block w-1/2 bg-transparent" />
      </div>
    </div>
  );
}
