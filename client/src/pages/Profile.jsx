import React, { useEffect, useState } from 'react'
import api from '../services/api';


const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchUser() {
        const res = await api.get('/api/auth/check_me');
        setUserInfo( res.data.user );
        console.log('user info in profile', res.data);
    }
    fetchUser();
  }, []);

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow rounded text-center'>
        <h2 className='text-2xl font-bold mb-4'>Profile</h2>
        <h3 className='text-lg mb-2'>{userInfo?.name}</h3>    
        <p className='text-gray-600'>{userInfo?.email}</p>
    </div>
  )
}   

export default Profile;
