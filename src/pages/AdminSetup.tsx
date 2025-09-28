import React, { useState } from 'react';
import { createAdminUser } from '../utils/adminSetup';

const AdminSetup: React.FC = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async () => {
    setLoading(true);
    setStatus('Creating admin user...');

    try {
      await createAdminUser('admin@beelovedshouse.com', 'Beeloved@1#', 'Bee Loved\'s House Admin');
      setStatus('Admin user created successfully! You can now login with admin@beelovedshouse.com');
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Setup</h1>
        <p className="text-gray-600 mb-6 text-center">
          Click the button below to create the admin user account.
        </p>

        <button
          onClick={handleCreateAdmin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Creating...' : 'Create Admin User'}
        </button>

        {status && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{status}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Admin Email: admin@beelovedshouse.com<br />
            Password: Beeloved@1#
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;