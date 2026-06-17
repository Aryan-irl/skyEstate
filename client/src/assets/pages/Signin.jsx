import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OAuth from '../../components/oauth';

export default function SignIn() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-xl sm:text-3xl mt-24 text-center font-semibold my-7'>Sign In</h1>
      <div className='flex text-xs sm:text-[1rem] mt-15 bg-[#EEEEEE] rounded-xl shadow-gray-300 shadow-md flex-col p-7 gap-5'>
        <p className='text-center text-sm sm:text-base'>Sign in with Google using Supabase. Existing Google users should use the button below.</p>
        <OAuth />
      </div>
      <div className='flex text-xs sm:text-[1rem] gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  );
}
