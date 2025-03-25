'use client';

import React, { useState } from 'react';
import { addToFavorites } from '@/libs/userFavourite';

interface AddFavouriteProps {
  campgroundId: string;
  token: string;
}

export default function AddFavourite({ campgroundId, token }: AddFavouriteProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToFavorites = async () => {
    setIsLoading(true);
    try {
      await addToFavorites(token, campgroundId);
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
      className={`mt-5 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isLoading}
    >
      {isLoading ? 'Adding...' : 'Add to Favorites'}
    </button>
  );
}
