import Banner from '@/components/Banner';
import Card from '@/components/Card';
import { getCampgrounds } from '@/libs/getCampgrounds';
import Link from 'next/link';

export default async function Home() {
  return (
    <main>
      <Banner />
    </main>
  );
}
