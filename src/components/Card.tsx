'use client';
import styles from './card.module.css';
import React from 'react';

interface CardProps {
  venueName: string;
  imgSrc: string;
}

function transformGoogleDriveLink(link: string): string {
  const match = link.match(/\/d\/(.*?)\//);
  return match ? `https://drive.google.com/uc?id=${match[1]}` : link;
}

export default function Card({ venueName, imgSrc }: CardProps) {
  const directImgSrc = transformGoogleDriveLink(imgSrc);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img src={directImgSrc} alt={venueName} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{venueName}</h3>
      </div>
    </div>
  );
}
