import React, { useState } from 'react';
import { makeUserAdmin } from '../utils/adminSetup';

const CreateAdmin: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('Beelovedshouse@gmail.com');

  const handleMakeAdmin = async () => {
    setStatus('loading');
    setError('');

    try {
      const result = await makeUserAdmin(email);
      setStatus('success');
      console.log('User made admin:', result);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Make User Admin</h1>

          {status === 'idle' && (
            <div className="space-y-4">
              <p className="text-gray-600">Enter the email of the user you want to make admin:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/70"
                placeholder="user@example.com"
              />
              <button
                onClick={handleMakeAdmin}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Make Admin
              </button>
            </div>
          )}

          {status === 'loading' && (
            <div className="space-y-4">
              <p className="text-gray-600">Making user admin...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="text-green-500 text-4xl">✅</div>
              <h2 className="text-xl font-bold text-green-700">Success!</h2>
              <p className="text-gray-600">User has been granted admin privileges!</p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-mono text-sm text-green-800">
                  Email: {email}<br/>
                  Role: admin
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