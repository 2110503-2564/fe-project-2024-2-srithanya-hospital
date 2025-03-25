'use client';

import { useState } from 'react';

export default function RemoveFavourite({ campgroundId, token }: { campgroundId: string; token: string }) {
  const [loading, setLoading] = useState(false);

  const handleRemoveFavourite = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://sdev-project-server.vercel.app/api/v1/favorites/${campgroundId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove from favourites');
      }

      alert('Removed from favourites');
       // Reload the page after removing from favourites
    } catch (error) {
      console.error(error);
      alert('Error removing from favourites');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemoveFavourite}
      disabled={loading}
      className="mt-5 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {loading ? 'Removing...' : 'Remove from Favourites'}
    </button>
  );
}
