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
    <main className="text-center p-5">
      <h1 className="text-4xl font-bold">{campgroundDetail.data.name}</h1>
      <div className="flex flex-row my-5">
        <Image 
          src={campgroundDetail.data.image} 
          width={0}
          height={0}
          sizes="100vw"
          alt="Campground Image" 
          className="rounded-lg w-[30%] bg-black" 
          unoptimized // Bypass Next.js optimization for external URLs
        />
        <div className='text-left w-[70%] p-5'>
          <div>Name: {campgroundDetail.data.name}</div>
          <div>Address: {campgroundDetail.data.address}</div>
          <div>Telephone: {campgroundDetail.data.tel}</div>
          <div>Description: {campgroundDetail.data.description}</div>
        </div>
      </div>
      {session && session.user && (
        <AddFavourite campgroundId={params._id} token={session.user.token} />
      )}
      {session && session.user && (
        <BookingButton campgroundId={params._id} token={session.user.token} />
      )}
    </main>
  );
}