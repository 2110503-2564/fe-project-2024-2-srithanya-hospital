'use client';

import { useRouter } from 'next/navigation';

export default function FavoritesToggle({ showFavorites }: { showFavorites: boolean }) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URL(window.location.href);
    if (e.target.checked) {
      url.searchParams.set('favorites', 'true');
    } else {
      url.searchParams.delete('favorites');
    }
    router.push(url.toString());
  };

  return (
    <label className="inline-flex items-center cursor-pointer space-x-2">
      <input
        type="checkbox"
        checked={showFavorites}
        onChange={handleChange}
        className="w-7 h-7 text-green-500 bg-gray-200 border-gray-300 rounded focus:ring-2 focus:ring-green-400 transition-all"
      />
      <span className="text-gray-700 font-medium text-lg">Show Only Favorites</span>
    </label>
  );
}
