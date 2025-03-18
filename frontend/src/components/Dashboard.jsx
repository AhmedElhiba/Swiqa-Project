import { usePage } from '@inertiajs/react';

const Dashboard = () => {
  const { user } = usePage().props; // Inertia provides user data automatically

  return <h1>Welcome, {user?.name}</h1>;
};

export default Dashboard;
