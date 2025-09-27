import React, { useState } from 'react';
import { createAdminUser } from '../utils/adminSetup';

const CreateAdmin: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleCreateAdmin = async () => {
    setStatus('loading');
    setError('');

    try {
      const result = await createAdminUser(
        'admin@beelovedshouse.com',
        'Beeloved@1#',
        'Bee Loved\'s House Admin'
      );

      setStatus('success');
      console.log('Admin created:', result);

    } catch (err: any) {
      setStatus('error');
      setError(err.message);
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Admin User</h1>

          {status === 'idle' && (
            <div className="space-y-4">
              <p className="text-gray-600">Click the button to create the admin user:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-mono text-sm text-gray-800">
                  Email: admin@beelovedshouse.com<br/>
                  Password: Beeloved@1#
                </p>
              </div>
              <button
                onClick={handleCreateAdmin}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Create Admin User
              </button>
            </div>
          )}

          {status === 'loading' && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
              <p className="text-gray-600">Creating admin user...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="text-green-500 text-4xl">✅</div>
              <h2 className="text-xl font-bold text-green-700">Success!</h2>
              <p className="text-gray-600">Admin user created successfully!</p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-mono text-sm text-green-800">
                  Email: admin@beelovedshouse.com<br/>
                  Password: Beeloved@1#
                </p>
              </div>
              <a
                href="/admin"
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Go to Admin Login
              </a>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="text-red-500 text-4xl">❌</div>
              <h2 className="text-xl font-bold text-red-700">Error</h2>
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => setStatus('idle')}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;