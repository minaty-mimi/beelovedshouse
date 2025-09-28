import React, { useState } from 'react';
import { createBucket } from '../lib/supabaseStorage';

const StorageSetup: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [method, setMethod] = useState<'auto' | 'manual'>('manual');

  const handleCreateBucket = async () => {
    setStatus('creating');
    setError('');

    try {
      // Create the products bucket
      const result = await createBucket('products');

      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setError(result.error || 'Failed to create bucket');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
        <h1 className="text-2xl font-bold text-center mb-6">Supabase Storage Setup</h1>
        <p className="text-gray-600 mb-6 text-center">
          Set up storage for your product images.
        </p>

        {/* Method Selection */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setMethod('manual')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                method === 'manual'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              Manual Setup (Recommended)
            </button>
            <button
              onClick={() => setMethod('auto')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                method === 'auto'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              Auto Setup
            </button>
          </div>
        </div>

        {method === 'manual' && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Manual Setup Steps:</h3>
              <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                <li>Go to your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">Supabase Dashboard</a></li>
                <li>Select your project (<code>beelovedshouse</code>)</li>
                <li>Click "Storage" in the left sidebar</li>
                <li>Click "Create bucket"</li>
                <li>Name it <code>products</code></li>
                <li>Check "Public bucket" for easy image access</li>
                <li>Click "Create bucket"</li>
              </ol>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Next: Configure Policies</h3>
              <p className="text-sm text-green-700 mb-2">After creating the bucket, go to the "Policies" tab and add:</p>
              <div className="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono">
                <div className="mb-2">-- Allow public read access</div>
                <div>CREATE POLICY "Public read access for products" ON storage.objects</div>
                <div>FOR SELECT USING (bucket_id = 'products');</div>
              </div>
            </div>

            <a
              href="/admin/dashboard"
              className="inline-block w-full text-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Continue to Admin Dashboard
            </a>
          </div>
        )}

        {method === 'auto' && (
          <>
            {status === 'idle' && (
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">⚠️ Requirements:</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• You must be logged in as admin</li>
                    <li>• Service role key needed for bucket creation</li>
                    <li>• May not work with anon key only</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Bucket Details:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Name: <code>products</code></li>
                    <li>• Public access: Yes</li>
                    <li>• File types: Images only (JPG, PNG, WebP, GIF)</li>
                    <li>• Max file size: 5MB</li>
                  </ul>
                </div>

                <button
                  onClick={handleCreateBucket}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Try Auto Create Bucket
                </button>
              </div>
            )}

            {status === 'creating' && (
              <div className="space-y-4 text-center">
                <p className="text-gray-600">Creating storage bucket...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4 text-center">
                <div className="text-green-500 text-4xl">✅</div>
                <h2 className="text-xl font-bold text-green-700">Success!</h2>
                <p className="text-gray-600">Products bucket created successfully!</p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    You can now upload product images in your admin dashboard.
                  </p>
                </div>
                <a
                  href="/admin/dashboard"
                  className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Go to Admin Dashboard
                </a>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4 text-center">
                <div className="text-red-500 text-4xl">❌</div>
                <h2 className="text-xl font-bold text-red-700">Auto Setup Failed</h2>
                <p className="text-red-600 mb-4">{error}</p>

                <div className="bg-blue-50 p-4 rounded-lg text-left">
                  <h3 className="font-medium text-blue-800 mb-2">Try Manual Setup Instead:</h3>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">Supabase Dashboard</a></li>
                    <li>Create bucket named <code>products</code></li>
                    <li>Make it public</li>
                    <li>Add read policy as shown above</li>
                  </ol>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStatus('idle')}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setMethod('manual')}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Manual Setup
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StorageSetup;