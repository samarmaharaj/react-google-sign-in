import React from 'react';
import type { UserProfile } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  onSignOut: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onSignOut }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-100 via-teal-100 to-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl text-center transform hover:scale-101 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-gray-800">Signed In Successfully</h1>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={user.picture}
            alt="User profile"
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="w-full px-4 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
