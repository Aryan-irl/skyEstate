import React from 'react'
import { Link } from "react-router-dom"
import { MdLocationOn } from 'react-icons/md'
import { FaBed, FaBath, FaParking } from 'react-icons/fa'

export default function ListingItem({ listing }) {
  const isRent = listing.type === 'rent';
  
  return (
    <div className="glass-card hover:border-sky-500/30 glow-blue-hover transition-all duration-300 overflow-hidden rounded-xl w-full sm:w-[280px] group flex flex-col justify-between">
      <Link to={`/listing/${listing._id}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden aspect-video sm:h-[180px] w-full">
          <img 
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
            src={listing.imageUrls[0]} 
            alt="cover" 
          />
          {/* Status Badge overlay */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
              isRent 
                ? 'bg-sky-500/80 backdrop-blur-sm' 
                : 'bg-amber-500/80 backdrop-blur-sm'
            }`}>
              For {isRent ? 'Rent' : 'Sale'}
            </span>
            {listing.offer && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white bg-emerald-500/80 backdrop-blur-sm">
                Offer
              </span>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2 flex-grow">
          <p className="truncate text-lg font-bold text-zinc-100 group-hover:text-sky-400 transition-colors duration-200">
            {listing.name}
          </p>
          
          <div className="flex items-center gap-1 text-zinc-400">
            <MdLocationOn className="h-4 w-4 text-sky-400 shrink-0" />
            <p className="text-xs truncate w-full">{listing.address}</p>
          </div>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
            {listing.description}
          </p>

          <p className="text-sky-400 font-extrabold text-lg mt-3 flex items-baseline gap-1">
            ${listing.offer 
              ? listing.discountedPrice.toLocaleString('en-us') 
              : listing.regularPrice.toLocaleString('en-us')
            }
            {isRent && <span className="text-xs font-normal text-zinc-400">/ month</span>}
          </p>

          <div className="text-zinc-300 flex items-center gap-3 mt-4 pt-3 border-t border-zinc-800/80">
            <div className="flex items-center gap-1.5 text-xs font-medium bg-zinc-800/50 px-2 py-1 rounded-md">
              <FaBed className="text-sky-400 h-3 w-3" />
              <span>{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium bg-zinc-800/50 px-2 py-1 rounded-md">
              <FaBath className="text-sky-400 h-3 w-3" />
              <span>{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
            </div>
            {listing.parking && (
              <div className="flex items-center gap-1.5 text-xs font-medium bg-zinc-800/50 px-2 py-1 rounded-md" title="Parking available">
                <FaParking className="text-sky-400 h-3 w-3" />
                <span>Yes</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
