'use client';

import React, { useState } from 'react';
import addToFavorites from '@/libs/userFavourite';

interface AddFavouriteProps {
  campgroundId: string;
  token: string;
}

export default function AddFavourite({ campgroundId, token }: AddFavouriteProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToFavorites = async () => {
    setIsLoading(true);
    try {
      const bookingDate = new Date().toISOString();
      await addToFavorites(token, bookingDate, campgroundId);
    //   const response = await addToFavorites(token, bookingDate, campgroundId);
    //   console.log(response.json());
      alert('Campground added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add to favorites.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToFavorites}
      className={`mt-5 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isLoading}
    >
      {isLoading ? 'Adding...' : 'Add to Favorites'}
    </button>
  );
}
