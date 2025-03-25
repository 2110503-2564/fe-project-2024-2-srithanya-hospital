import Link from 'next/link';
import Card from '@/components/Card';
import { getCampgrounds } from '@/libs/getCampgrounds';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';
import getFavourites from '@/libs/getFavourites';
import CampgroundActions from '../../../components/CampgroundActions';
import FavoritesToggle from '@/components/FavoritesToggle'; // Import the new Client Component
import { removeFromFavorites } from '@/libs/userFavourite';
// import router from 'next/router';

export default async function venue({ searchParams }: { searchParams: { favorites?: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('User session not found');
  }
  const profile = await getUserProfile(session.user.token);
  const { data: campgrounds } = await getCampgrounds();
  const favoriteCampgrounds = await getFavourites(session.user.token);

  // Ensure both campgrounds and favoriteCampgrounds are arrays
  const allCampgrounds = Array.isArray(campgrounds) ? campgrounds : [];
  const favorites = Array.isArray(favoriteCampgrounds) ? favoriteCampgrounds : [];

  // Determine whether to show only favorites based on the query parameter
  const showFavorites = searchParams.favorites === 'true';
  const filteredCampgrounds = showFavorites
    ? favorites.filter((fav: { campground: any }) => fav.campground !== null)
    : allCampgrounds.filter((campground: { _id?: string }) => campground._id);

  return (
    <main className="text-center p-5">
      <div className="mt-10 px-6">
        <h2 className="text-2xl font-semibold mb-4">Explore Campgrounds</h2>
        {profile.data.role === 'admin' && (
          <CampgroundActions token={session.user.token} isAdmin={true} />
        )}
        <div className="mb-4">
          <FavoritesToggle showFavorites={showFavorites} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCampgrounds
            .filter((campground: { _id?: string }) => campground._id) // Ensure _id exists
            .map((campground: { _id: string; name: string; image: string }) => (
              <div key={campground._id} className="relative">
                <Link href={`/campgrounds/${campground._id}`}>
                  <Card venueName={campground.name} imgSrc={campground.image} />
                </Link>
                {profile.data.role === 'admin' && (
                  <CampgroundActions
                    token={session.user.token}
                    campgroundId={campground._id}
                    isAdmin={false}
                    favorites={favorites} // Pass favorites to CampgroundActions
                  />
                )}
              </div>
            ))}
            
        </div>
      </div>
    </main>
  );
}