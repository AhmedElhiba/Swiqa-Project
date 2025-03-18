import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }) {
  return (
    <Layout user={auth.user}>
      <Head title="Dashboard" />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              <p>You're logged in as {auth.user.name}!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}