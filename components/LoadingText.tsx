'use client';
import React, { useState, useEffect } from 'react';

export default function Loading() {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        const newDots = prevDots.length === 3 ? '.' : prevDots + '.';
        return newDots;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      Loading{dots}
    </div>
  );
}