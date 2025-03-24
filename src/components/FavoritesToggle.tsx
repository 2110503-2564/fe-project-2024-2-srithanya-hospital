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
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        checked={showFavorites}
        onChange={handleChange}
        className="mr-2"
      />
      Show Only Favorites
    </label>
  );
}
