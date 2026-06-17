import React from 'react'
import { supabase } from '../supabase'

const oauth = () => {
  const handleGoogleClick = async() =>{
    try{
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    }catch(error){
      console.log('could not sign in with google' , error)
    }
  };

  return (
    <button type="button" onClick={handleGoogleClick}
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'> Continue with google</button>
  )
}

export default oauth;
