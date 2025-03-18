import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/GuestLayout';

export default function Home({ auth }) {
  return (
    <Layout>
      <Head title="Welcome" />
      
      <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg p-6">
            <h1 className="text-4xl font-bold text-center mb-6">Welcome to Your Application</h1>
            
            <div className="flex justify-center mt-4 sm:items-center">
              {auth.user ? (
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-700 dark:text-gray-500 underline"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-gray-700 dark:text-gray-500 underline mr-4"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}