'use client';

import { useState } from 'react';

export default function RemoveFavourite({ campgroundId, token }: { campgroundId: string; token: string }) {
  const [loading, setLoading] = useState(false);

  const handleRemoveFavourite = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/favourites/${campgroundId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove from favourites');
      }

      // Optionally, trigger a re-fetch or update UI state
      alert('Removed from favourites');
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
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {loading ? 'Removing...' : 'Remove from Favourites'}
    </button>
  );
}
