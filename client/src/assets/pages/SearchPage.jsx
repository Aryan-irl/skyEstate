import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ListingItem from '../../components/ListingItem'

const SearchPage = () => {
  const navigate = useNavigate()
  const [sidebarData , setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking:false,
    furnished:false,
    offer:false,
    sort: 'created_at',
    order:'desc',
  })

  const[loading,setLoading] = useState(true)
  const [listings , setListings] = useState([]);
  const [showMore , setShowMore] = useState(false)

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type')
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if(
      searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl 
    ){
      setSidebarData({
        searchTerm:searchTermFromUrl || '',
        type : typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true :false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      })
    }
    const fetchListings = async()=>{
      setShowMore(false)
      setLoading(true)
      const SearchQuery = urlParams.toString()
      const res = await fetch (`api/listing/get?${SearchQuery}`)
      const data = await res.json();
      if(data.length>8){
        setShowMore(true)
      }else{
        setShowMore(false)
      }
      setListings(data);
      setLoading(false);
    }
    fetchListings()
  }, [location.search])
  // console.log(listings)
  
  const handleChange = (e) =>{
    if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
      setSidebarData({...sidebarData, type:e.target.id})
    }
    if(e.target.id === 'searchTerm'){
      setSidebarData({...sidebarData, searchTerm:e.target.value})
    }
    if(e.target.id ==='parking' || e.target.id ==='offer' || e.target.id ==='furnished'){
      setSidebarData({...sidebarData , [e.target.id] : (e.target.checked || e.target.checked === 'true')? true : false})
    }
    if(e.target.id === 'sort_order'){
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebarData({...sidebarData , sort , order})
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm' , sidebarData.searchTerm)
    urlParams.set('type' , sidebarData.type)
    urlParams.set('parking' , sidebarData.parking)
    urlParams.set('furnished' , sidebarData.furnished)
    urlParams.set('offer' , sidebarData.offer)
    urlParams.set('sort' , sidebarData.sort)
    urlParams.set('order' , sidebarData.order)

    const SearchQuery = urlParams.toString()
    navigate(`/search?${SearchQuery}`)
  }

  const onShowMoreClick = async()=>{
    const numberOfListings = listings.length
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex' , startIndex)
    const SearchQuery = urlParams.toString();
    const res = await fetch((`/api/listing/get?${SearchQuery}`))
    const data = await res.json();
    if(data.length < 9){
      setShowMore(false);
    }
    setListings([...listings , ...data]);
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-[#0f0f10] text-zinc-100'> 
      <div className='mt-20 p-7 md:min-h-screen border-b md:border-b-0 md:border-r border-zinc-800/80 bg-zinc-950/40 w-full md:w-80 shrink-0'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-sm text-zinc-300'>Search Term</label>
            <input 
              type="text" 
              id="searchTerm" 
              placeholder='Search by name or keyword...' 
              value={sidebarData.searchTerm} 
              onChange={handleChange} 
              className='bg-zinc-900/80 border border-zinc-800 focus:border-sky-500 rounded-xl p-3.5 w-full text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-all'
            />
          </div>
          
          <div className='flex flex-col gap-3'>
            <label className='font-semibold text-sm text-zinc-300'>Type</label>
            <div className='flex flex-col gap-2.5'>
              <label className='flex items-center gap-3 cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors'>
                <input onChange={handleChange} checked={sidebarData.type === 'all'} type="checkbox" id="all" className='accent-sky-500 h-4 w-4 rounded border-zinc-800 bg-zinc-900'/>
                <span>Rent & Sale</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors'>
                <input onChange={handleChange} checked={sidebarData.type === 'rent'} type="checkbox" id="rent" className='accent-sky-500 h-4 w-4 rounded border-zinc-800 bg-zinc-900'/>
                <span>Rent</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors'>
                <input onChange={handleChange} checked={sidebarData.type === 'sale'} type="checkbox" id="sale" className='accent-sky-500 h-4 w-4 rounded border-zinc-800 bg-zinc-900'/>
                <span>Sale</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors'>
                <input onChange={handleChange} checked={sidebarData.offer === true} type="checkbox" id="offer" className='accent-sky-500 h-4 w-4 rounded border-zinc-800 bg-zinc-900'/>
                <span>Offer</span>
              </label>
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <label className='font-semibold text-sm text-zinc-300'>Amenities</label>
            <div className='flex flex-col gap-2.5'>
              <label className='flex items-center gap-3 cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors'>
                <input onChange={handleChange} checked={sidebarData.parking === true} type="checkbox" id="parking" className='accent-sky-500 h-4 w-4 rounded border-zinc-800 bg-zinc-900'/>
                <span>Parking Spot</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors'>
                <input onChange={handleChange} checked={sidebarData.furnished === true} type="checkbox" id="furnished" className='accent-sky-500 h-4 w-4 rounded border-zinc-800 bg-zinc-900'/>
                <span>Furnished</span>
              </label>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-sm text-zinc-300'>Sort By</label>
            <select 
              onChange={handleChange} 
              defaultValue={'createdAt_desc'} 
              className='bg-zinc-900/80 border border-zinc-800 focus:border-sky-500 rounded-xl p-3.5 text-zinc-100 focus:outline-none transition-all cursor-pointer' 
              id="sort_order"
            >
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Latest Listings</option>
              <option value="createdAt_asc">Oldest Listings</option>
            </select>
          </div>

          <button className='bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold p-3.5 rounded-xl uppercase hover:shadow-lg hover:shadow-sky-500/10 active:scale-[0.98] transition-all duration-200 mt-2'>
            Apply Filters
          </button>
        </form>
      </div>

      <div className='flex-grow p-6 md:p-8 mt-4 md:mt-20'>
        <h1 className='text-3xl font-extrabold border-b border-zinc-850 pb-4 text-zinc-100 tracking-tight'>
          Listing Results
        </h1>
        
        <div className='mt-8 flex flex-wrap gap-6 justify-start'>
          {!loading && listings.length === 0 && (
            <div className="flex flex-col gap-2 items-center justify-center w-full py-20 text-zinc-500">
              <p className='text-xl font-medium'>No listings found</p>
              <p className='text-sm text-zinc-650'>Try adjusting your search filters or keyword</p>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center w-full py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500"></div>
            </div>
          )}

          {!loading && listings && listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </div>

        {!loading && showMore && (
          <button 
            onClick={onShowMoreClick} 
            className='bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 hover:text-sky-400 text-zinc-100 rounded-lg p-3 text-center mx-auto my-12 w-64 block transition-all font-semibold shadow-sm hover:border-sky-500/20 shadow-sky-500/5'
          >
            Show More Listings
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchPage