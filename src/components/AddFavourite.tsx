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
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isLoading}
    >
      {isLoading ? 'Adding...' : 'Add to Favorites'}
    </button>
  );
}
