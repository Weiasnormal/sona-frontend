"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import "../../styles/responsive.css";
import { sendMBTIData, getFunctionPair } from '@/utils/api';

// Define the quiz questions with their scoring values
// Scores array format: [Openness, Conscientiousness, Extraversion, Agreeableness]
// Higher scores increase likelihood of: [N, J, E, F] respectively
const questions = [
  {
    id: 1,
    text: "I enjoy trying new foods and traveling to unfamiliar places.",
    options: [
      { id: "A", text: "I constantly seek out new experiences and exotic destinations.", scores: [0.8, 0.3, 0.6, 0.6] },
      { id: "B", text: "I enjoy exploring new places but like some familiarity.", scores: [0.6, 0.4, 0.5, 0.5] },
      { id: "C", text: "I'm neutral about trying new things versus sticking to what I know.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "I prefer familiar places with occasional new experiences.", scores: [0.4, 0.6, 0.4, 0.5] },
      { id: "E", text: "I strongly prefer my established routines and familiar environments.", scores: [0.2, 0.7, 0.3, 0.4] }
    ]
  },
  {
    id: 2,
    text: "When making decisions, I tend to:",
    options: [
      { id: "A", text: "Follow a strict plan and detailed schedule.", scores: [0.3, 0.8, 0.3, 0.4] },
      { id: "B", text: "Have a general plan but remain flexible.", scores: [0.4, 0.6, 0.4, 0.5] },
      { id: "C", text: "Balance planning with spontaneity equally.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Mostly go with the flow but have some loose guidelines.", scores: [0.6, 0.4, 0.6, 0.5] },
      { id: "E", text: "Act completely spontaneously and adapt as I go.", scores: [0.7, 0.2, 0.7, 0.6] }
    ]
  },
  {
    id: 3,
    text: "In social situations, I typically:",
    options: [
      { id: "A", text: "Feel energized and seek to be the center of attention.", scores: [0.5, 0.4, 0.8, 0.6] },
      { id: "B", text: "Enjoy socializing with many people but don't need the spotlight.", scores: [0.5, 0.5, 0.7, 0.6] },
      { id: "C", text: "Feel comfortable in both social and solitary settings equally.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Prefer small groups or one-on-one interactions.", scores: [0.5, 0.5, 0.3, 0.5] },
      { id: "E", text: "Feel drained by social interaction and prefer being alone.", scores: [0.5, 0.5, 0.2, 0.4] }
    ]
  },
  {
    id: 4,
    text: "When thinking about concepts and ideas, I prefer:",
    options: [
      { id: "A", text: "Exploring theoretical possibilities and abstract concepts.", scores: [0.8, 0.4, 0.5, 0.6] },
      { id: "B", text: "Considering innovative ideas with some practical applications.", scores: [0.7, 0.5, 0.5, 0.5] },
      { id: "C", text: "Balancing theoretical and practical considerations equally.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Focusing on practical applications with some theory.", scores: [0.3, 0.6, 0.5, 0.4] },
      { id: "E", text: "Dealing exclusively with concrete facts and proven methods.", scores: [0.2, 0.7, 0.5, 0.3] }
    ]
  },
  {
    id: 5,
    text: "When it comes to organization and structure:",
    options: [
      { id: "A", text: "I'm extremely organized with detailed plans for everything.", scores: [0.3, 0.8, 0.4, 0.5] },
      { id: "B", text: "I'm generally organized but can adapt when needed.", scores: [0.4, 0.7, 0.5, 0.5] },
      { id: "C", text: "I have moderate organization with some flexibility.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "I prefer flexibility with minimal structure.", scores: [0.6, 0.3, 0.5, 0.5] },
      { id: "E", text: "I avoid structure and prefer complete spontaneity.", scores: [0.7, 0.2, 0.6, 0.6] }
    ]
  },
  {
    id: 6,
    text: "When it comes to leadership roles:",
    options: [
      { id: "A", text: "I naturally take charge and enjoy directing others.", scores: [0.5, 0.6, 0.9, 0.4] },
      { id: "B", text: "I'm comfortable leading when necessary.", scores: [0.5, 0.6, 0.7, 0.5] },
      { id: "C", text: "I can lead or follow depending on the situation.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "I prefer to support rather than lead.", scores: [0.5, 0.4, 0.3, 0.6] },
      { id: "E", text: "I actively avoid leadership positions.", scores: [0.5, 0.3, 0.1, 0.7] }
    ]
  },
  {
    id: 7,
    text: "When interacting with others, I tend to:",
    options: [
      { id: "A", text: "Connect deeply and empathize strongly with their feelings.", scores: [0.5, 0.4, 0.6, 0.9] },
      { id: "B", text: "Listen with empathy while maintaining some objectivity.", scores: [0.5, 0.5, 0.5, 0.7] },
      { id: "C", text: "Balance emotional understanding with logical analysis.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Focus more on facts and logic than emotions.", scores: [0.5, 0.6, 0.4, 0.3] },
      { id: "E", text: "Prioritize objective truth over emotional considerations.", scores: [0.5, 0.7, 0.3, 0.1] }
    ]
  },
  {
    id: 8,
    text: "When solving problems, I prefer to:",
    options: [
      { id: "A", text: "Explore multiple innovative possibilities and patterns.", scores: [0.9, 0.4, 0.5, 0.5] },
      { id: "B", text: "Consider new approaches while drawing on what's worked before.", scores: [0.7, 0.5, 0.5, 0.5] },
      { id: "C", text: "Use a mix of creative and traditional methods equally.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Rely on proven methods with some room for innovation.", scores: [0.3, 0.6, 0.5, 0.5] },
      { id: "E", text: "Follow established procedures and practical solutions.", scores: [0.1, 0.7, 0.5, 0.5] }
    ]
  },
  {
    id: 9,
    text: "Regarding rules and procedures, I typically:",
    options: [
      { id: "A", text: "Follow them strictly and expect others to do the same.", scores: [0.3, 0.9, 0.4, 0.4] },
      { id: "B", text: "Generally adhere to them with occasional exceptions.", scores: [0.4, 0.7, 0.5, 0.5] },
      { id: "C", text: "Follow important ones but question those that seem unnecessary.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Often find my own approach to achieving the same goals.", scores: [0.6, 0.3, 0.6, 0.6] },
      { id: "E", text: "Prefer to create my own path rather than follow established rules.", scores: [0.7, 0.1, 0.7, 0.7] }
    ]
  },
  {
    id: 10,
    text: "My ideal social environment is:",
    options: [
      { id: "A", text: "Large gatherings where I can meet many new people.", scores: [0.5, 0.4, 0.9, 0.6] },
      { id: "B", text: "Social events with a mix of familiar faces and new people.", scores: [0.5, 0.5, 0.7, 0.6] },
      { id: "C", text: "Balanced between social time and alone time.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Small gatherings with close friends or family.", scores: [0.5, 0.6, 0.3, 0.4] },
      { id: "E", text: "Quiet environments with minimal social interaction.", scores: [0.5, 0.7, 0.1, 0.3] }
    ]
  },
  {
    id: 11,
    text: "When making decisions that affect others, I prioritize:",
    options: [
      { id: "A", text: "People's feelings and maintaining harmony above all.", scores: [0.5, 0.4, 0.5, 0.9] },
      { id: "B", text: "The wellbeing of people while considering practical factors.", scores: [0.5, 0.5, 0.5, 0.7] },
      { id: "C", text: "A balance between people's needs and objective criteria.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Logical analysis with some consideration for feelings.", scores: [0.5, 0.6, 0.5, 0.3] },
      { id: "E", text: "Objective truth and fairness regardless of emotional impact.", scores: [0.5, 0.7, 0.5, 0.1] }
    ]
  },
  {
    id: 12,
    text: "When starting a new project, I prefer to:",
    options: [
      { id: "A", text: "Have a detailed plan with clear milestones and deadlines.", scores: [0.4, 0.9, 0.5, 0.5] },
      { id: "B", text: "Create an outline with room for adjustments as needed.", scores: [0.5, 0.7, 0.5, 0.5] },
      { id: "C", text: "Have a general direction but remain adaptable.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Start working and let the plan evolve naturally.", scores: [0.6, 0.3, 0.5, 0.5] },
      { id: "E", text: "Jump in and figure things out as I go along.", scores: [0.7, 0.1, 0.5, 0.5] }
    ]
  },
  {
    id: 13,
    text: "I find my energy is most depleted after:",
    options: [
      { id: "A", text: "Spending time alone with limited social interaction.", scores: [0.5, 0.5, 0.9, 0.5] },
      { id: "B", text: "Having some alone time with occasional interaction.", scores: [0.5, 0.5, 0.7, 0.5] },
      { id: "C", text: "A balanced mix of social and solitary activities.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Extended social interaction with brief breaks.", scores: [0.5, 0.5, 0.3, 0.5] },
      { id: "E", text: "Prolonged social events with many people.", scores: [0.5, 0.5, 0.1, 0.5] }
    ]
  },
  {
    id: 14,
    text: "When learning something new, I prefer to:",
    options: [
      { id: "A", text: "Understand the big picture concepts and underlying patterns.", scores: [0.9, 0.5, 0.5, 0.5] },
      { id: "B", text: "Grasp the theory while seeing some practical examples.", scores: [0.7, 0.5, 0.5, 0.5] },
      { id: "C", text: "Balance theoretical understanding with practical application.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Learn through hands-on practice with some theory.", scores: [0.3, 0.5, 0.5, 0.5] },
      { id: "E", text: "Focus entirely on practical skills and real-world application.", scores: [0.1, 0.5, 0.5, 0.5] }
    ]
  },
  {
    id: 15,
    text: "In a disagreement, I typically:",
    options: [
      { id: "A", text: "Prioritize maintaining harmony even if it means compromising my position.", scores: [0.5, 0.5, 0.5, 0.9] },
      { id: "B", text: "Try to find common ground while expressing my perspective.", scores: [0.5, 0.5, 0.5, 0.7] },
      { id: "C", text: "Balance logical arguments with consideration for others' feelings.", scores: [0.5, 0.5, 0.5, 0.5] },
      { id: "D", text: "Present logical arguments while acknowledging emotions.", scores: [0.5, 0.5, 0.5, 0.3] },
      { id: "E", text: "Focus on facts and truth regardless of emotional reactions.", scores: [0.5, 0.5, 0.5, 0.1] }
    ]
  }
];

// Function to determine MBTI type based on scores
const determineMBTI = (scores: number[]) => {
  // Check if there's a forced MBTI type in localStorage for testing
  if (typeof window !== 'undefined') {
    const forcedType = localStorage.getItem('forcedMBTIType');
    if (forcedType && forcedType.length === 4) {
      console.log("Using forced MBTI type:", forcedType);
      return forcedType;
    }
  }

  // [Openness, Conscientiousness, Extraversion, Agreeableness]
  const [O, C, E, A] = scores;
  
  // Normalize scores to a 0-1 scale centered around 0.5
  // This ensures that the neutral middle option (C) results in a score of 0.5
  // With 15 questions, the theoretical max raw score would be 15 if all answers were extreme
  const normalizedO = Math.min(Math.max(O / 15, 0), 1);
  const normalizedC = Math.min(Math.max(C / 15, 0), 1);
  const normalizedE = Math.min(Math.max(E / 15, 0), 1);
  const normalizedA = Math.min(Math.max(A / 15, 0), 1);
  
  // Adjust thresholds to counter the ENTJ bias
  // Increase thresholds for E, N, T, J to make them harder to achieve
  // This means scores need to be higher to get E, N, T, J results
  const eThreshold = 0.55 + (Math.random() * 0.02 - 0.01); // Between 0.54 and 0.56
  const oThreshold = 0.55 + (Math.random() * 0.02 - 0.01); // Higher threshold for N
  const aThreshold = 0.45 + (Math.random() * 0.02 - 0.01); // Lower threshold for F (0.44-0.46)
  const cThreshold = 0.55 + (Math.random() * 0.02 - 0.01); // Higher threshold for J
  
  // Determine I/E (Introversion/Extraversion)
  const firstLetter = normalizedE > eThreshold ? "E" : "I";
  
  // Determine S/N (Sensing/iNtuition) based on Openness
  const secondLetter = normalizedO > oThreshold ? "N" : "S";
  
  // Determine T/F (Thinking/Feeling) based on Agreeableness
  const thirdLetter = normalizedA > aThreshold ? "F" : "T";
  
  // Determine J/P (Judging/Perceiving) based on Conscientiousness
  const fourthLetter = normalizedC > cThreshold ? "J" : "P";
  
  // Log the scores and thresholds for debugging
  console.log("Raw Scores:", { O, C, E, A });
  console.log("Normalized Scores:", { normalizedO, normalizedC, normalizedE, normalizedA });
  console.log("Thresholds:", { eThreshold, oThreshold, aThreshold, cThreshold });
  console.log("Resulting type:", `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`);
  
  return `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`;
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]); // [O, C, E, A]
  const [quizComplete, setQuizComplete] = useState(false);
  const [personalityType, setPersonalityType] = useState("");
  const [progress, setProgress] = useState(0);
  const [apiCallStatus, setApiCallStatus] = useState<'idle' | 'loading' | 'success' | 'fallback' | 'error'>('idle');
  const [devMode, setDevMode] = useState(false);
  const [forcedMBTI, setForcedMBTI] = useState('');

  // Clear localStorage values when starting a new quiz
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('personalityType');
      localStorage.removeItem('forcedMBTIType');
      localStorage.removeItem('musicRecommendations');
      localStorage.removeItem('recommendationsSource');
      console.log('Cleared previous quiz data from localStorage');
    }
  }, []);

  // Handle answer selection
  const handleAnswer = (optionScores: number[]) => {
    // Update scores by adding the option's scores
    const newScores = scores.map((score, index) => score + optionScores[index]);
    setScores(newScores);
    
    // Move to next question or complete quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      const newProgress = Math.round(((currentQuestion + 1) / questions.length) * 100);
      setProgress(newProgress);
    } else {
      // Use raw scores directly - the determineMBTI function now handles normalization
      // This ensures proper handling of the 15 questions with 5 options each
      
      // Determine personality type
      const mbti = determineMBTI(newScores);
      setPersonalityType(mbti);
      
      // Store the personality type in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('personalityType', mbti);
      }
      
      // Log the final scores for debugging
      console.log("Final raw scores:", newScores);
      
      // Send MBTI data to the API
      setApiCallStatus('loading');
      sendMBTIToAPI(mbti, newScores);
      
      setQuizComplete(true);
    }
  };

  // Function to send MBTI data to the API
  const sendMBTIToAPI = async (mbti: string, normalizedScores: number[]) => {
    // If we're in dev mode and have a forced MBTI type, use that instead
    if (forcedMBTI && devMode) {
      mbti = forcedMBTI;
      console.log(`Using forced MBTI type for API call: ${mbti}`);
    }
    setApiCallStatus('loading');
    
    try {
      // Create audio feature values based on normalized scores
      // These are example mappings - you may want to adjust these based on your needs
      const [openness, conscientiousness, extraversion, agreeableness] = normalizedScores;
      
      const mbtiData = {
        mbti: mbti,
        function_pair: getFunctionPair(mbti),
        danceablitiy: 0.4 + (extraversion * 0.3),  // More extraverted = more danceable
        liveliness: 0.3 + (openness * 0.2),        // More open = more lively
        valance: 0.3 + (agreeableness * 0.3),      // More agreeable = more positive valance
        energy: 0.4 + (extraversion * 0.4),        // More extraverted = more energy
        instrumentalness: 0.1 + (conscientiousness * 0.1), // More conscientious = more instrumental
        loudness: -10 + (extraversion * 5),        // More extraverted = louder
        tempo: 100 + (openness * 40)               // More open = faster tempo
      };
      
      // The updated sendMBTIData function will handle retries and fallbacks
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
      console.error('Error in MBTI API process:', error);
      setApiCallStatus('error');
    }
  };

  // Toggle developer mode with keyboard shortcut (Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setDevMode(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle forced MBTI type selection
  const handleForceMBTI = (type: string) => {
    setForcedMBTI(type);
    localStorage.setItem('forcedMBTIType', type);
    console.log(`MBTI type forced to: ${type}`);
  };

  // Clear forced MBTI type
  const clearForcedMBTI = () => {
    setForcedMBTI('');
    localStorage.removeItem('forcedMBTIType');
    console.log('Forced MBTI type cleared');
  };

  // Check for existing forced MBTI on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem('forcedMBTIType');
      if (savedType) {
        setForcedMBTI(savedType);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-gradient-to-b from-red-400 to-red-500 dark:from-[#1C81E7] dark:to-[#1C81E7]/80 min-h-screen overflow-x-hidden">
        <div className="relative w-full">
          {/* Wave-like shape at the bottom */}
          <div className="absolute bottom-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path fill="currentColor" className="text-white dark:text-gray-900" fillOpacity="1" d="M0,96L80,106.7C160,117,320,139,480,149.3C640,160,800,160,960,138.7C1120,117,1280,75,1360,53.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 pt-20 pb-40 text-center from-black to-white relative z-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tune Into Your Personality</h1>
            <p className="text-xl mb-8">Your traits. Your tunes.</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
            {!quizComplete ? (
              <div>
                {/* Question */}
                <h2 className="text-gray-700 dark:text-gray-200 text-xl sm:text-2xl font-bold text-center mb-8">
                  {questions[currentQuestion].text}
                </h2>
                
                {/* Answer options */}
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button key={option.id} onClick={() => handleAnswer(option.scores)}
                    className="font-semibold w-full text-left p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-[#1C81E7]/20 transition-colors">
                      
                      {option.text}
                    </button>
                  ))}
                </div>
                
                {/* Progress indicator */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{progress}% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 dark:bg-[#1C81E7] rounded-full transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Your Personality Type</h2>
                <div className="inline-block bg-red-100 dark:bg-[#1C81E7]/20 rounded-full px-6 py-4 mb-6">
                  <h3 className="text-4xl sm:text-5xl font-bold text-red-600 dark:text-[#1C81E7]">{personalityType}</h3>
                </div>
                <p className="mb-6 text-gray-700 dark:text-gray-300">Based on your answers, we've created personalized music recommendations for you.</p>
                
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
          
          {/* Developer Mode Panel - Only visible when devMode is true */}
          {devMode && (
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Developer Mode</h3>
                <button 
                  onClick={() => setDevMode(false)}
                  className="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                >
                  Hide
                </button>
              </div>
              
              <div className="mb-3">
                <p className="text-xs text-yellow-700 dark:text-yellow-400 mb-2">Force MBTI Type (for testing):</p>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {['ISTJ', 'ISFJ', 'INFJ', 'INTJ'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleForceMBTI(type)}
                      className={`text-xs py-1 px-2 rounded ${forcedMBTI === type ? 'bg-yellow-500 text-white' : 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-300'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {['ISTP', 'ISFP', 'INFP', 'INTP'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleForceMBTI(type)}
                      className={`text-xs py-1 px-2 rounded ${forcedMBTI === type ? 'bg-yellow-500 text-white' : 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-300'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {['ESTP', 'ESFP', 'ENFP', 'ENTP'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleForceMBTI(type)}
                      className={`text-xs py-1 px-2 rounded ${forcedMBTI === type ? 'bg-yellow-500 text-white' : 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-300'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {['ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleForceMBTI(type)}
                      className={`text-xs py-1 px-2 rounded ${forcedMBTI === type ? 'bg-yellow-500 text-white' : 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-300'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={clearForcedMBTI}
                    className="text-xs py-1 px-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800/30"
                  >
                    Clear Forced Type
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-yellow-600 dark:text-yellow-500 italic">
                Current forced type: {forcedMBTI ? <span className="font-medium">{forcedMBTI}</span> : 'None'}<br/>
                Press <kbd className="px-1 py-0.5 text-xs rounded bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200">Ctrl+Shift+D</kbd> to toggle developer mode
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}