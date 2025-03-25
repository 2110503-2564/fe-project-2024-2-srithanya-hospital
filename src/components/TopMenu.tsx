import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="flex justify-between items-center h-[60px]">
                <div className="flex items-center ml-1">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Image 
                            src={'/img/logo.png'} 
                            alt='logo' 
                            width={100} 
                            height={40} 
                            className="h-[50px] w-auto object-contain"
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-4 pr-4">
                    <TopMenuItem title='Campgrounds' pageRef='/campgrounds' />
                    <TopMenuItem title='My-Bookings' pageRef='/mybooking' />
                    {
                        session ? 
                        <Link href="/api/auth/signout" className="text-red-500 hover:text-red-600 transition-colors font-semibold">
                            Sign-Out
                        </Link> 
                        : 
                        <>
                            <Link href="/api/auth/signin" className="text-green-500 hover:text-green-600 transition-colors font-semibold">
                                Sign-In
                            </Link>
                            <div className="text-gray-400">|</div>
                            <Link href="/register" className="text-green-500 hover:text-green-600 transition-colors font-semibold">
                                Register
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}