import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import ListingItem from "../../components/ListingItem";
import { sliderSettings } from "../../sliderSettings.js";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  const [offerSwiper, setOfferSwiper] = useState(null);
  const [rentSwiper, setRentSwiper] = useState(null);
  const [saleSwiper, setSaleSwiper] = useState(null);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent");
        const data = await res.json();
        setRentListings(data);
        fetchsaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchsaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="bg-[#0f0f10] min-h-screen text-zinc-100">
      {/* top / Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-[#0f0f10] pt-24 pb-16 sm:pb-24 border-b border-zinc-800/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="flex flex-col sm:gap-6 gap-4 p-8 px-4 max-w-6xl mx-auto relative z-10">
          <h1 className="mt-12 text-zinc-100 font-extrabold sm:text-4xl text-2xl lg:text-7xl tracking-tight leading-none">
            Discover your next <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">premium</span>
            <br />living space
          </h1>
          <div className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
            skyEstate connects you to a curated collection of verified homes, luxury apartments, and modern spaces. Explore listing options tailored perfectly to your lifestyle.
          </div>
          <div className="mt-4">
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-sky-500/25 hover:scale-[1.02] active:scale-95 transition-all duration-300"
              to={"/search"}
            >
              Let's get started &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* listing results */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-16">
        
        {offerListings && offerListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end border-b border-zinc-800/60 pb-3 flex-wrap gap-4">
              <div>
                <h2 className="sm:text-3xl text-xl font-extrabold text-zinc-100 tracking-tight">Recent offers</h2>
                <p className="text-xs text-zinc-400 mt-1">Special deals and discounted premium properties</p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  className="text-xs sm:text-sm text-sky-400 hover:text-sky-300 font-medium hover:underline transition-colors"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
                <div className="flex gap-2">
                  <button
                    className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 text-zinc-100 shadow-sm rounded-full h-8 w-8 flex items-center justify-center hover:text-sky-400 active:scale-95 transition-all duration-200"
                    onClick={() => offerSwiper?.slidePrev()}
                    aria-label="Previous slide"
                  >
                    &larr;
                  </button>
                  <button
                    className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 text-zinc-100 shadow-sm rounded-full h-8 w-8 flex items-center justify-center hover:text-sky-400 active:scale-95 transition-all duration-200"
                    onClick={() => offerSwiper?.slideNext()}
                    aria-label="Next slide"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
            <Swiper onSwiper={setOfferSwiper} {...sliderSettings} className="py-4 w-full">
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <ListingItem listing={listing} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end border-b border-zinc-800/60 pb-3 flex-wrap gap-4">
              <div>
                <h2 className="sm:text-3xl text-xl font-extrabold text-zinc-100 tracking-tight">Recent places for rent</h2>
                <p className="text-xs text-zinc-400 mt-1">Curated luxury residential units available for lease</p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  className="text-xs sm:text-sm text-sky-400 hover:text-sky-300 font-medium hover:underline transition-colors"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
                <div className="flex gap-2">
                  <button
                    className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 text-zinc-100 shadow-sm rounded-full h-8 w-8 flex items-center justify-center hover:text-sky-400 active:scale-95 transition-all duration-200"
                    onClick={() => rentSwiper?.slidePrev()}
                    aria-label="Previous slide"
                  >
                    &larr;
                  </button>
                  <button
                    className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 text-zinc-100 shadow-sm rounded-full h-8 w-8 flex items-center justify-center hover:text-sky-400 active:scale-95 transition-all duration-200"
                    onClick={() => rentSwiper?.slideNext()}
                    aria-label="Next slide"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
            <Swiper onSwiper={setRentSwiper} {...sliderSettings} className="py-4 w-full">
              {rentListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <ListingItem listing={listing} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end border-b border-zinc-800/60 pb-3 flex-wrap gap-4">
              <div>
                <h2 className="sm:text-3xl text-xl font-extrabold text-zinc-100 tracking-tight">Recent places for sale</h2>
                <p className="text-xs text-zinc-400 mt-1">Stunning modern homes and buildings for purchase</p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  className="text-xs sm:text-sm text-sky-400 hover:text-sky-300 font-medium hover:underline transition-colors"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
                <div className="flex gap-2">
                  <button
                    className="bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-zinc-100 shadow-sm rounded-full h-8 w-8 flex items-center justify-center hover:text-sky-400 active:scale-95 transition-all duration-200"
                    onClick={() => saleSwiper?.slidePrev()}
                    aria-label="Previous slide"
                  >
                    &larr;
                  </button>
                  <button
                    className="bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-zinc-100 shadow-sm rounded-full h-8 w-8 flex items-center justify-center hover:text-sky-400 active:scale-95 transition-all duration-200"
                    onClick={() => saleSwiper?.slideNext()}
                    aria-label="Next slide"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
            <Swiper onSwiper={setSaleSwiper} {...sliderSettings} className="py-4 w-full">
              {saleListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <ListingItem listing={listing} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
