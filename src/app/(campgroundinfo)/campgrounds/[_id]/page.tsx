import Image from 'next/image';
import { getCampground } from '@/libs/getCampground';
import BookingButton from '@/components/BookingButton';
import AddFavourite from '@/components/AddFavourite';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function CampgroundDetailPage({ params }: { params: { _id: string } }) {
  const session = await getServerSession(authOptions);

  console.log('Fetching campground details for ID:', params._id);
  const campgroundDetail = await getCampground(params._id);
  console.log('Fetched campground details:', campgroundDetail);

  return (
    <main className="text-center p-10 bg-gray-50 h-full">
      <h1 className="text-5xl font-extrabold text-gray-500 mb-16">{campgroundDetail.data.name}</h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 my-8 bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <div className="w-full md:w-1/3">
          <Image 
            src={campgroundDetail.data.image} 
            width={500}
            height={300}
            sizes="100vw"
            alt="Campground Image" 
            className="rounded-lg w-full h-full object-cover" 
            unoptimized
          />
        </div>
        <div className='text-left w-full md:w-2/3 mt-6 md:mt-0'>
          <div className="text-xl font-medium text-gray-800 mb-2">
            <strong>Name:</strong> {campgroundDetail.data.name}
          </div>
          <div className="text-lg text-gray-700 mb-2">
            <strong>Address:</strong> {campgroundDetail.data.address}
          </div>
          <div className="text-lg text-gray-700 mb-2">
            <strong>Telephone:</strong> {campgroundDetail.data.tel}
          </div>
          <div className="text-lg text-gray-700 mb-4">
            <strong>Description:</strong> {campgroundDetail.data.description}
          </div>
        </div>
      </div>
      {session && session.user && (
        <div className="space-x-4 mt-6 flex justify-center">
          <AddFavourite campgroundId={params._id} token={session.user.token} />
          <BookingButton campgroundId={params._id} token={session.user.token} />
        </div>
      )}
    </main>
  );
}