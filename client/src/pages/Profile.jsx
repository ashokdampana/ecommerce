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
    <div className='text-2xl'>
        <h2>Profile</h2>
        <h3>{userInfo?.name}</h3>    
        <p>{userInfo?.email}</p>
    </div>
  )
}   

export default Profile;
