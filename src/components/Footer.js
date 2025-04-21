"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#121623] text-white mt-10">
      {/* Top Section: About, Quick Links, Categories */}
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between">
        
        {/* 🔹 About Section */}
        <div className="mb-6 md:mb-0">
          <Image
            src="/ads/logo.png" // 🔁 Change logo path if needed
            alt="NepNews Logo"
            width={150}
            height={50}
          />
          <p className="text-sm text-grey-500 max-w-xs mt-2">
            Trusted Nepali news platform bringing you the latest headlines, stories, and analysis.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            {/* 🔁 Add or remove links as needed */}
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/profile" className="hover:underline">Profile</Link></li>
            <li><Link href="/signup" className="hover:underline">Sign Up</Link></li>
            <li><Link href="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* 🔹 Categories Section */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Categories</h4>
          <ul className="space-y-1 text-sm capitalize">
            {/* 🔁 Update categories as needed */}
            {["national", "international", "politics", "sports", "technology"].map((cat) => (
              <li key={cat}>
                <Link href={`/category/${cat}`} className="hover:underline">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-white border-opacity-20 text-center py-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} <span className="font-semibold">NepNews</span>. All rights reserved.
      </div>
    </footer>
  );
}
