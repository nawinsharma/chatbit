'use client';

import { useState } from 'react';
import { authClient } from '../../lib/auth-client';
import { api } from '../../lib/api-client';

export default function TestAuthPage() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSession = async () => {
    try {
      const sessionData = await authClient.getSession();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-expect-error
      setSession(sessionData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get session');
    }
  };

  const testProtectedRoute = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getProfile();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-expect-error
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const createTestChatGroup = async () => {
    try {
      const result = await api.createChatGroup({
        title: 'Test Chat Group',
        passcode: '123456'
      });
      console.log('Chat group created:', result);
      alert('Chat group created successfully! Check console for details.');
    } catch (err) {
      console.error('Failed to create chat group:', err);
      alert('Failed to create chat group. Check console for details.');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Session Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Session Status</h2>
          <button 
            onClick={checkSession}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          >
            Check Session
          </button>
          
          {session && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Session Data:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Protected Route Testing */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Protected Routes</h2>
          
          <div className="space-y-4">
            <button 
              onClick={testProtectedRoute}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Test Profile API'}
            </button>
            
            <button 
              onClick={createTestChatGroup}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Create Test Chat Group
            </button>
          </div>

          {profile && (
            <div className="bg-gray-50 p-4 rounded mt-4">
              <h3 className="font-semibold mb-2">Profile Response:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mt-6">
        <h3 className="font-semibold mb-2">How to Test:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>First, make sure you&apos;re logged in to the app</li>
          <li>Click &quot;Check Session&quot; to verify your authentication status</li>
          <li>Click &quot;Test Profile API&quot; to test the protected backend route</li>
          <li>Click &quot;Create Test Chat Group&quot; to test another protected endpoint</li>
          <li>If you&apos;re not logged in, you&apos;ll see authentication errors</li>
        </ol>
      </div>
    </div>
  );
} 