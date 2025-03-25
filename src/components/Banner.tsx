"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Banner() {
  const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg'];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % covers.length);
        setFade(false);
      }, 500); // Fade duration
    }, 3200); // Switch image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          fade ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={covers[index]}
          alt="cover"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Book Your Perfect Campground</h1>
          <h3 className="text-2xl font-light mb-8">
            Find and reserve the best campgrounds for your next adventure. 
            Experience nature like never before!
          </h3>
          <button
            onClick={() => router.push('/campgrounds')}
            className="bg-white text-gray-600 border border-gray-600 font-semibold py-3 px-6 rounded hover:bg-gray-600 hover:text-white hover:border-transparent transition-colors"
          >
            Explore Campgrounds
          </button>
        </div>
      </div>
    </div>
  );
}