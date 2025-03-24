import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';
import BookingActions from '@/components/BookingActions';

export default async function MyBookingPage() {
  const session = await getServerSession(authOptions);
  console.log('Session:', session);

  if (!session || !session.user.token) {
    console.log('No session or token found.');
    return <div>Please sign in to view your bookings.</div>;
  }
  const profile = await getUserProfile(session.user.token);

  const response = await fetch('https://sdev-project-server.vercel.app/api/v1/bookings?populate=user', {
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
    cache: 'no-store', // Ensure fresh data
  });

  console.log('API Response Status:', response.status);

  if (!response.ok) {
    console.log('Failed to fetch bookings:', await response.text());
    return <div>Failed to load bookings.</div>;
  }

  const data = await response.json();
  console.log('Fetched Bookings Data:', data);

  const bookings =
    profile.data.role === 'admin'
      ? data.data // Admin sees all bookings
      : data.data.filter((booking: { user: string }) => booking.user === profile.data._id); // User sees only their bookings

  console.log('Filtered Bookings:', bookings);

  return (
    <main className="p-5">
      <h1 className="text-3xl font-bold mb-5">My Bookings </h1>
      <p className="text-gray-600">
        User: {profile.data.name} ({profile.data.email}) <br/>
        Role: {profile.data.role}
      </p>
      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookings.map((booking: { members: Number; namelastname:string; _id: string; campground: { name?: string; address?: string } | null; bookingDate: string; user: { name: string; tel: string } }) => (
            <div
              key={booking._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">
                {booking.campground?.name || 'Unknown Campground'}
              </h2>
              <p className="text-gray-400">
                {booking.campground?.address || 'Address not available'}
              </p>
              <p className="text-gray-700">
                Booker: {booking.namelastname || 'Unknown'} <br />
                Number of people: {booking.members?.toString() || 'N/A'}
              </p>
              <p className="text-gray-1000">
                Date: {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
              <BookingActions bookingId={booking._id} token={session.user.token} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
