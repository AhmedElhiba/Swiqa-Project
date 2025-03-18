import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import Layout from '@/Layouts/GuestLayout';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <Layout>
      <Head title="Log in" />
      
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              required
            />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              required
            />
            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={data.remember}
                onChange={e => setData('remember', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={processing}
            >
              {processing ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}