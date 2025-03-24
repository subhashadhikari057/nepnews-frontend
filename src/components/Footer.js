"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white mt-10">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between">
        {/* About */}
        <div className="mb-6 md:mb-0">
          <Image
            src="/ads/logo.png" // Path to your logo in public/ads folder
            alt="NepNews Logo"
            width={150} // Adjust width as needed
            height={50} // Adjust height as needed
          />
          <p className="text-sm text-gray-300 max-w-xs">
            Trusted Nepali news platform bringing you the latest headlines, stories, and analysis.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/profile" className="hover:underline">Profile</Link></li>
            <li><Link href="/signup" className="hover:underline">Sign Up</Link></li>
            <li><Link href="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Categories</h4>
          <ul className="space-y-1 text-sm capitalize">
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

      {/* Copyright */}
      <div className="border-t border-white border-opacity-20 text-center py-4 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} <span className="font-semibold">NepNews</span>. All rights reserved.
      </div>
    </footer>
  );
}
