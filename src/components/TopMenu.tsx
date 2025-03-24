import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-[60px] gap-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image 
              src={'/img/logo.png'} 
              alt='logo' 
              width={100} 
              height={40} 
              className="h-[40px] w-auto object-contain"
            />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <TopMenuItem title='Campgrounds' pageRef='/campgrounds' />
          <TopMenuItem title='My-Bookings' pageRef='/mybooking' />
          {
            session ? 
            <Link href="/api/auth/signout" className="hover:text-red-500 transition-colors">
              <div className='flex items-center'>
                Sign-Out
              </div>
            </Link> 
            : 
            <>
              <Link href="/api/auth/signin" className="hover:text-green-500 transition-colors">
                <div className='flex items-center'>
                  Sign-In
                </div>
              </Link>
              <div>|</div>
              <Link href="/register" className="hover:text-green-500 transition-colors">
                  <div className='flex items-center'>
                    Register
                  </div>
              </Link>
              </>
          }
        </div>
      </div>
    </div>
  );
}