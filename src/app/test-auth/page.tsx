'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestAuthPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setError(`Session error: ${error.message}`);
      } else {
        setResult({ type: 'session', data });
      }
    } catch (err: any) {
      setError(`Connection error: ${err.message}`);
    }
  };

  const testSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: `test${Date.now()}@example.com`,
        password: 'test123456',
      });

      if (error) {
        setError(`Signup error: ${error.message}`);
      } else {
        setResult({ type: 'signup', data });
      }
    } catch (err: any) {
      setError(`Signup exception: ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Auth Test</h1>

      <div className="space-y-4 mb-8">
        <div className="p-4 bg-gray-100 rounded">
          <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
          <p><strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20)}...</p>
        </div>

        <button
          onClick={testConnection}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Connection
        </button>

        <button
          onClick={testSignup}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-4"
        >
          Test Signup
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 rounded mb-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {result && (
        <div className="p-4 bg-green-100 border border-green-400 rounded">
          <p className="font-bold mb-2">Success!</p>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
