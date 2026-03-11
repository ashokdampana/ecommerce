import React from 'react';
import useTanQuery from '../hooks/useTanQuery.js';

const Profile = () => {
  const { data, isLoading, isError } = useTanQuery('/api/auth/check_me', ['profile']);

  if (isLoading) return <div className="flex justify-center mt-20">Loading...</div>;
  if (isError) return <div className="text-center mt-20 text-red-500">Error loading profile</div>;

  const user = data?.user;

  return (
    <div className="flex justify-center pt-10 px-4">
      {/* Manual Card Styling */}
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        
        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          {user?.name?.[0].toUpperCase()}
        </div>

        <p className="font-semibold text-lg">{user?.name}</p>
        <p className="text-gray-600">{user?.email}</p>
        
        <button className="btn-primary mt-6">Edit</button>
      </div>
    </div>
  );
};

export default Profile;