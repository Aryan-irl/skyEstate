import React, {useState, useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const {currentUser} = useSelector(state => state.user)
  const [searchTerm , setSearchTerm] = useState('')
  const navigate = useNavigate()
  // console.log(currentUser)

  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm' , searchTerm);
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search]);

  return (
    <header className='glass-header fixed top-0 left-0 right-0 z-50 transition-all duration-300'>
      <div className='flex justify-between items-center max-w-6xl mx-auto px-4 py-3 sm:px-6'>
        <Link to="/">
          <h1 className='font-extrabold text-lg sm:text-2xl tracking-tight flex items-center gap-1 hover:opacity-90 transition-opacity'>
            <span className='bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent'>sky</span>
            <span className='text-zinc-100'>Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-zinc-800/80 border border-zinc-700/50 focus-within:border-sky-500/80 focus-within:ring-1 focus-within:ring-sky-500/30 px-4 py-2 flex items-center rounded-full transition-all duration-300 w-40 sm:w-96'>
          <input
            type="text"
            placeholder='Search premium spaces...'
            className='bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none w-full mr-2'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className='text-zinc-400 hover:text-sky-400 transition-colors'>
            <FaSearch className='h-4 w-4' />
          </button>
        </form>
        <ul className='flex items-center gap-4 sm:gap-6'>
          <Link to="/">
            <li className='hidden sm:inline text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer'>
              Home
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className='rounded-full h-8 w-8 hover:scale-105 border border-sky-500/30 object-cover shadow-sm transition-all duration-300'
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className='text-sm font-semibold bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 transition-all duration-300 cursor-pointer'>
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header