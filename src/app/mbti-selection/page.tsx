"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { sendMBTIData, getFunctionPair } from '@/utils/api';

// All 16 MBTI types
const mbtiTypes = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

// Group MBTI types by their function pairs
const mbtiGroups = {
  'ST': ['ISTJ', 'ISTP', 'ESTP', 'ESTJ'],
  'SF': ['ISFJ', 'ISFP', 'ESFP', 'ESFJ'],
  'NF': ['INFJ', 'INFP', 'ENFP', 'ENFJ'],
  'NT': ['INTJ', 'INTP', 'ENTP', 'ENTJ']
};

export default function MBTISelectionPage() {
  const [selectedMBTI, setSelectedMBTI] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Handle MBTI type selection
  const handleMBTISelect = (mbti: string) => {
    setSelectedMBTI(mbti);
  };

  // State for API call status
  const [apiCallStatus, setApiCallStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'fallback'>('idle');
  const [showResults, setShowResults] = useState(false);

  // Handle submission of selected MBTI
  const handleSubmit = async () => {
    if (!selectedMBTI) return;
    
    setIsProcessing(true);
    setApiCallStatus('loading');
    setShowResults(true);
    
    try {
      // Store the personality type in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('personalityType', selectedMBTI);
        localStorage.setItem('forcedMBTIType', selectedMBTI);
      }
      
      // Create default audio feature values based on the MBTI type
      const functionPair = getFunctionPair(selectedMBTI);
      
      // Prepare MBTI data with default audio features
      const mbtiData = {
        mbti: selectedMBTI,
        function_pair: functionPair,
        danceablitiy: 0.56468,
        liveliness: 0.136674,
        valance: 0.433126,
        energy: 0.60764,
        instrumentalness: 0.060110227,
        loudness: -7.75768,
        tempo: 123.76112
      };
      
      // Send MBTI data to API
      const response = await sendMBTIData(mbtiData);
      
      // Check if we got a response (either from API or fallback)
      if (response) {
        console.log('API or Fallback Response:', response);
        
        // Check if this is a real API response or fallback data
        const isRealApiResponse = !response.message?.includes('fallback');
        
        // Store recommendations in localStorage if available
        if (response.recommendations) {
          try {
            console.log('Saving recommendations to localStorage:', response.recommendations);
            localStorage.setItem('musicRecommendations', JSON.stringify(response.recommendations));
            // Also store whether this was from the real API or fallback
            localStorage.setItem('recommendationsSource', isRealApiResponse ? 'api' : 'fallback');
          } catch (storageError) {
            console.warn('Could not save recommendations to localStorage:', storageError);
          }
        } else {
          console.warn('No recommendations property in response:', response);
        }
        
        // Set different status based on whether we got real API data or fallback
        setApiCallStatus(isRealApiResponse ? 'success' : 'fallback');
      } else {
        // This should rarely happen since we have fallbacks
        console.warn('No response data received');
        setApiCallStatus('error');
      }
    } catch (error) {
      console.error('Error processing MBTI selection:', error);
      setApiCallStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-white dark:bg-[#0A0A0A] min-h-screen overflow-hidden">
        <div className="relative w-full">
          {/* Blue Circle */}
          <div className="absolute -left-[60%] -top-[5%] w-[110%] h-[110%] blur-1xl opacity-100">
            <Image
              src="/images/Blue Circle.svg"
              alt="Blue Circle Background"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Blue Circle */}
          <div className="absolute -right-[55%] -bottom-[240%] w-[100%] h-[100%] blur-1xl opacity-100">
            <Image
              src="/images/Blue Circle.svg"
              alt="Blue Circle Background"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Yellow Circle */}
          <div className="absolute -right-[10%] top-[80%] w-[100%] h-[100%] blur-1xl opacity-80">
            <Image
              src="/images/Yellow Circle.svg"
              alt="Blue Circle Background"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Purple Circle */}
          <div className="absolute -right-[50%] top-[-50%] w-[100%] h-[100%] blur-1xl opacity-100">
            <Image
              src="/images/Purple Circle.svg"
              alt="Purple Circle Background"
              fill
              className="object-contain"
              priority
            />
          </div>        
          
          {/* Purple Circle */}
          <div className="absolute -left-[10%] top-[200%] w-[80%] h-[80%] blur-1xl opacity-80">
            <Image
              src="/images/Purple Circle.svg"
              alt="Purple Circle Background"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Yellow Circle */}
          <div className="absolute -left-[50%] -bottom-[280%] w-[100%] h-[100%] blur-2xl opacity-100">
            <Image
              src="/images/Yellow Circle.svg"
              alt="Yellow Circle Background"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 pt-20 pb-40 text-center from-black to-white relative z-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tune Into Your Personality</h1>
            <p className="text-xl mb-8">Do you already know your MBTI personality type?</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
          <div className="flex justify-center">
            <div className="w-full lg:w-1/2 bg-[#FEFEFE] dark:bg-gray-900/20 backdrop-blur- rounded-xl shadow-lg border border-white/30 dark:border-gray-700/30 p-4 sm:p-6">
              {!showResults ? (
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    Choose Your Path
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    Select your MBTI type if you already know it, or take our quiz to discover it.
                  </p>
                  
                  {/* MBTI Type Selection */}
                  <div className="mb-8">
                                    
                    {/* MBTI Types Grid - Grouped by function pairs */}
                    <div className="space-y-4">
                      {Object.entries(mbtiGroups).map(([group, types]) => (
                        <div key={group} className="mb-4">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {group === 'ST' ? 'Sensing + Thinking' : 
                             group === 'SF' ? 'Sensing + Feeling' : 
                             group === 'NF' ? 'Intuition + Feeling' : 
                             'Intuition + Thinking'}
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {types.map(type => (
                              <button
                                key={type}
                                onClick={() => handleMBTISelect(type)}
                                className={`py-2 px-3 rounded-md transition-all ${
                                  selectedMBTI === type 
                                    ? 'bg-red-500 dark:bg-[#1C81E7] text-white' 
                                    : 'bg-white/90 dark:bg-gray-900/40 backdrop-blur-md border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 shadow-md'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedMBTI || isProcessing}
                      className={`px-6 py-3 rounded-full font-medium transition-all ${
                        selectedMBTI && !isProcessing
                          ? 'bg-red-500 hover:bg-red-600 dark:bg-[#1C81E7] dark:hover:bg-[#1C81E7]/80 text-white'
                          : 'bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/30 dark:border-gray-700/30 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Continue with Selected Type'
                      )}
                    </button>
                    
                    <Link href="/take-quiz" className="px-6 py-3 rounded-full font-medium bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/30 dark:border-gray-700/30 text-red-500 dark:text-[#1C81E7] hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all shadow-md">
                      I Don't Know My Type - Take Quiz
                    </Link>
                  </div>
                  
                  {/* Information about MBTI */}
                  <div className="mt-12 text-left bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-white/30 dark:border-gray-700/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      What is MBTI?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      The Myers-Briggs Type Indicator (MBTI) is a personality assessment that categorizes people into 16 distinct types based on how they perceive the world and make decisions. Each type is represented by four letters that stand for key personality dimensions: Extraversion (E) or Introversion (I), Sensing (S) or Intuition (N), Thinking (T) or Feeling (F), and Judging (J) or Perceiving (P).
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Your Personality Type</h2>
                  <div className="inline-block bg-red-100 dark:bg-[#1C81E7]/20 rounded-full px-6 py-4 mb-6">
                    <h3 className="text-4xl sm:text-5xl font-bold text-red-600 dark:text-[#1C81E7]">{selectedMBTI}</h3>
                  </div>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">Based on your selection, we've created personalized music recommendations for you.</p>
                  
                  {/* API call status indicator with improved user feedback */}
                  {apiCallStatus === 'loading' && (
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-8 h-8 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mb-2"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Generating your personalized recommendations...</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This might take a few moments</p>
                    </div>
                  )}
                  {apiCallStatus === 'error' && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        <span className="font-medium">Connection issue:</span> We couldn't reach our recommendation service.
                      </p>
                      <p className="text-xs text-red-500 dark:text-red-300 mt-1">
                        Don't worry! We've prepared some great tracks for you based on your personality type.
                      </p>
                    </div>
                  )}
                  {apiCallStatus === 'success' && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-green-600 dark:text-green-400">
                        <span className="font-medium">Success!</span> Your personalized recommendations from Spotify are ready.
                      </p>
                    </div>
                  )}
                  {apiCallStatus === 'fallback' && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        <span className="font-medium">Recommendations ready!</span> We've prepared personalized tracks based on your personality type.
                      </p>
                      <p className="text-xs text-blue-500 dark:text-blue-300 mt-1">
                        Note: We're using our curated selection as our music service is currently updating.
                      </p>
                    </div>
                  )}
                  
                  <Link href="/Home" className="inline-block bg-red-500 hover:bg-red-600 dark:bg-[#1C81E7] dark:hover:bg-[#1C81E7]/80 text-white font-medium py-3 px-6 rounded-full transition-colors">
                    See Your Music Recommendations
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
