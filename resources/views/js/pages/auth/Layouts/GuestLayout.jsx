import React from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <div className="mb-6 text-center">
          <Link href="/">
            <h1 className="text-3xl font-bold">Your App</h1>
          </Link>
        </div>
        
        {children}
      </div>
    </div>
  );
}