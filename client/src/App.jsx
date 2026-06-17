import React, { useEffect } from 'react'
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import Home from './assets/pages/Home'
import Signin from './assets/pages/Signin'
import Signup from './assets/pages/Signup'
import Profile from './assets/pages/Profile'
import About from './assets/pages/About'
import Header from './components/Header'
import {PrivateRoute} from './components/PrivateRoute'
import CreateListing from './assets/pages/CreateListing'
import UpdateListing from './assets/pages/UpdateListing'
import Listing from './assets/pages/Listing'
import SearchPage from './assets/pages/SearchPage'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess } from './redux/user/userSlice'
import { supabase } from './supabase'

export default function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user && !currentUser) {
        const user = session.user;
        try {
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: user.user_metadata.full_name || user.user_metadata.name || user.email.split('@')[0],
              email: user.email,
              photo: user.user_metadata.avatar_url || user.user_metadata.picture
            })
          });
          const data = await res.json();
          dispatch(signInSuccess(data));
          // Sign out from Supabase Auth immediately to prevent session conflicts
          await supabase.auth.signOut();
        } catch (error) {
          console.error('Error logging in with Supabase Google OAuth:', error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [currentUser, dispatch]);

  return (
    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/listing/:listingId' element={<Listing/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  ) 
}
