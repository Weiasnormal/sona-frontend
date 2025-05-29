"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed quiz
    const personalityType = localStorage.getItem('personalityType');
    const quizInProgress = localStorage.getItem('quizInProgress');
    
    // Set up redirect timer
    const timer = setTimeout(() => {
      if (personalityType) {
        // If quiz is completed, go to home
        router.push('/Home');
      } else {
        // If quiz is not completed, go to MBTI selection
        router.push('/mbti-selection');
      }
    }, 10000); // 10 second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="mb-8">
          <Image
            src="/images/Sona.svg"
            alt="Sona Logo"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Welcome to Sona
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Your personal music companion that understands your personality and musical preferences
        </p>

        <div className="animate-pulse">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Redirecting you to discover your musical personality...
          </p>
        </div>

        <button
          onClick={() => router.push('/mbti-selection')}
          className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors font-medium"
        >
          Get Started Now
        </button>
      </div>
    </main>
  );
} 