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
    }, 5000); // 5 second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue Circle */}
        <div className="absolute -left-[10%] -top-[10%] w-[40%] h-[40%] blur-2xl">
          <Image
            src="/images/Blue Circle.svg"
            alt="Blue Circle Background"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Purple Circle */}
        <div className="absolute -right-[15%] top-[20%] w-[50%] h-[50%] blur-2xl">
          <Image
            src="/images/Purple Circle.svg"
            alt="Purple Circle Background"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Yellow Circle */}
        <div className="absolute -bottom-[15%] -left-[15%] w-[45%] h-[45%] blur-2xl">
          <Image
            src="/images/Yellow Circle.svg"
            alt="Yellow Circle Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/images/SONA.svg"
            alt="Sona Logo"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* Main Content */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Discover Music<br />
            That Matches<br />
            <span className="text-indigo-400">Your Personality</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl mx-auto">
            Your personal music companion that understands your personality and musical preferences
          </p>

          <button
            onClick={() => router.push('/mbti-selection')}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors font-medium text-lg"
          >
            Select Your MBTI →
          </button>
        </div>
      </div>
    </main>
  );
} 