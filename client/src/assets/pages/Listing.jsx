import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleDeleteListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/listing/delete/${listing._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate('/profile');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div className='bg-[#0f0f10] min-h-screen text-zinc-100 pt-20 pb-12'>
      {loading && (
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center py-40 gap-2 text-zinc-400">
          <p className='text-2xl font-semibold'>Something went wrong!</p>
          <Link to="/" className="text-sky-400 hover:underline">Return Home</Link>
        </div>
      )}
      {listing && !loading && !error && (
        <div className="px-4 sm:px-6">
          <Swiper navigation className="my-8 rounded-2xl overflow-hidden max-w-5xl mx-auto border border-zinc-800/40">
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='absolute top-[22%] right-[5%] z-20 border border-zinc-800/50 rounded-full w-10 h-10 flex justify-center shadow-lg items-center bg-zinc-900/90 backdrop-blur-sm cursor-pointer text-zinc-300 hover:text-sky-400 hover:border-sky-500/30 transition-all'>
            <FaShare
              className='h-4 w-4'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='absolute shadow-xl border border-zinc-850 top-[28%] right-[5%] z-20 rounded-xl bg-zinc-900/90 backdrop-blur-sm text-zinc-100 text-xs px-3.5 py-2 font-medium'>
              Link copied!
            </p>
          )}

          <div className='flex flex-col max-w-5xl mx-auto p-6 gap-6 bg-zinc-900/30 border border-zinc-800/40 rounded-2xl relative z-10 glass-card'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-100'>
                {listing.name}
              </h1>
              <p className='text-xl sm:text-2xl font-extrabold text-sky-400'>
                ${listing.offer
                  ? listing.discountedPrice.toLocaleString('en-us') 
                  : listing.regularPrice.toLocaleString('en-us') }
                {listing.type === 'rent' && <span className='text-sm font-normal text-zinc-400'> / month</span>}
              </p>
            </div>

            <p className='flex items-center gap-2 text-zinc-400 text-sm'>
              <FaMapMarkerAlt className='text-sky-400 h-4 w-4 shrink-0' />
              {listing.address}
            </p>

            <div className='flex gap-3 flex-wrap'>
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase text-white ${
                listing.type === 'rent' ? 'bg-sky-500/80 backdrop-blur-sm' : 'bg-amber-500/80 backdrop-blur-sm'
              }`}>
                For {listing.type === 'rent' ? 'Rent' : 'Sale'}
              </span>
              {listing.offer && (
                <span className='bg-emerald-500/80 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase'>
                  ${(Number(listing.regularPrice) - Number(listing.discountedPrice)).toLocaleString('en-us')} OFF
                </span>
              )}
            </div>

            <div className='border-t border-zinc-800/80 pt-6'>
              <h3 className='font-bold text-zinc-200 text-lg mb-3'>Description</h3>
              <p className='text-zinc-450 text-sm leading-relaxed whitespace-pre-line'>{listing.description}</p>
            </div>

            <div className='flex flex-wrap gap-4 pt-6 border-t border-zinc-800/80'>
              <div className='flex items-center gap-2 bg-zinc-800/30 border border-zinc-800/60 px-4 py-2.5 rounded-xl text-zinc-300 text-sm'>
                <FaBed className='text-sky-400 text-base' />
                <span>{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
              </div>
              <div className='flex items-center gap-2 bg-zinc-800/30 border border-zinc-800/60 px-4 py-2.5 rounded-xl text-zinc-300 text-sm'>
                <FaBath className='text-sky-400 text-base' />
                <span>{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
              </div>
              <div className='flex items-center gap-2 bg-zinc-800/30 border border-zinc-800/60 px-4 py-2.5 rounded-xl text-zinc-300 text-sm'>
                <FaParking className='text-sky-400 text-base' />
                <span>{listing.parking ? 'Parking spot' : 'No Parking'}</span>
              </div>
              <div className='flex items-center gap-2 bg-zinc-800/30 border border-zinc-800/60 px-4 py-2.5 rounded-xl text-zinc-300 text-sm'>
                <FaChair className='text-sky-400 text-base' />
                <span>{listing.furnished ? 'Furnished' : 'Unfurnished'}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-4 flex-wrap sm:flex-nowrap">
              {currentUser && listing.userRef === currentUser._id ? (
                <>
                  <button
                    onClick={handleDeleteListing}
                    className="bg-red-650/90 hover:bg-red-700 text-white font-bold text-center py-3.5 px-6 rounded-xl uppercase hover:shadow-lg active:scale-95 transition-all w-full sm:max-w-xs cursor-pointer"
                  >
                    Delete Listing
                  </button>
                  <Link
                    to={`/update-listing/${listing._id}`}
                    className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold text-center py-3.5 px-6 rounded-xl uppercase hover:shadow-lg active:scale-95 transition-all w-full sm:max-w-xs flex justify-center items-center"
                  >
                    Edit Listing
                  </Link>
                </>
              ) : (
                <>
                  <a
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-center py-3.5 px-6 rounded-xl w-full sm:max-w-xs shadow-md hover:shadow-lg hover:shadow-sky-500/10 active:scale-95 transition-all"
                    href="tel:+919315849406"
                  >
                    Call now
                  </a>
                  <a
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center py-3.5 px-6 rounded-xl w-full sm:max-w-xs shadow-md hover:shadow-lg hover:shadow-emerald-600/10 active:scale-95 transition-all"
                    href="https://wa.me/9315849406"
                  >
                    WhatsApp
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
