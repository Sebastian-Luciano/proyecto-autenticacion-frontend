import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function Profile() {
  const { user } = useAuth();

  return (
    <Layout >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">Personal info</h1>
        <p className="mb-8 text-center text-lg">Basic info, like your name and photo</p>

        <div className="shadow border border-gray-300 rounded-3xl">
          <div className="flex justify-between items-center p-8 border-b">
            <div>
              <h2 className="text-2xl font-bold">Profile</h2>
              <p className="">Some info may be visible to other people</p>
            </div>
            <Link to="/edit" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-800">
              Edit
            </Link>
          </div>

          <div className={`p-8 space-y-6`}>
            <div className="flex items-center">
              <span className={`w-1/3`}>PHOTO</span>
              {user.photo ? (
                <img src={api.getImageUrl(user.photo)} alt="Profile" className="w-24 h-24 rounded-md object-cover" />
              ) : (
                <Avatar name={user.name || 'User'} size="64" round={true} />
              )}
            </div>
            <div className={`flex items-center`}>
              <span className="w-1/3">NAME</span>
              <span>{user.name || 'Enter your name...'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3">BIO</span>
              <span>{user.bio || 'Enter your bio...'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3">PHONE</span>
              <span>{user.phone || 'Enter your phone...'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3">EMAIL</span>
              <span>{user.email || 'Enter your email...'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3">PASSWORD</span>
              <span>{'************' || 'Enter your new password...'}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

