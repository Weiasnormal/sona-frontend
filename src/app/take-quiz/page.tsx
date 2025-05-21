"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import "../../styles/responsive.css";

// Define the quiz questions with their scoring values
const questions = [
  {
    id: 1,
    text: "I enjoy trying new foods and traveling to unfamiliar places.",
    options: [
      { id: "A", text: "I always look for new experiences and destinations.", scores: [0.9, 0.1, 0.2, 0.1] },
      { id: "B", text: "I like travel but prefer familiar routines.", scores: [0.3, 0.4, 0.3, 0.3] },
      { id: "C", text: "I rarely travel or try unfamiliar things.", scores: [0.1, 0.9, 0.2, 0.1] },
      { id: "D", text: "I prefer to stay local and follow my usual habits.", scores: [0.2, 0.2, 0.8, 0.5] }
    ]
  },
  {
    id: 2,
    text: "I prefer plans and routines over spontaneous decisions.",
    options: [
      { id: "A", text: "I like everything scheduled and organized ahead of time.", scores: [0.2, 0.9, 0.1, 0.2] },
      { id: "B", text: "I generally follow plans but allow some flexibility.", scores: [0.1, 0.8, 0.2, 0.2] },
      { id: "C", text: "I sometimes plan, but I enjoy acting on impulse.", scores: [0.6, 0.2, 0.1, 0.3] },
      { id: "D", text: "I dislike strict routines and often go with the flow.", scores: [0.1, 0.1, 0.6, 0.3] }
    ]
  },
  {
    id: 3,
    text: "I feel energized when I'm around other people.",
    options: [
      { id: "A", text: "I thrive in social settings and love meeting new people.", scores: [0.2, 0.2, 0.9, 0.2] },
      { id: "B", text: "I enjoy being social but need some alone time.", scores: [0.2, 0.3, 0.6, 0.3] },
      { id: "C", text: "I'm social in small groups or familiar settings.", scores: [0.4, 0.1, 0.2, 0.8] },
      { id: "D", text: "I prefer quiet and solitary environments.", scores: [0.1, 0.2, 0.2, 0.9] }
    ]
  },
  {
    id: 4,
    text: "I often reflect on abstract ideas and theories.",
    options: [
      { id: "A", text: "I enjoy discussing and thinking about abstract topics.", scores: [0.9, 0.2, 0.2, 0.2] },
      { id: "B", text: "I'm curious but mostly focus on practical things.", scores: [0.3, 0.4, 0.1, 0.2] },
      { id: "C", text: "I find abstract thinking interesting but hard to apply.", scores: [0.8, 0.1, 0.1, 0.2] },
      { id: "D", text: "I prefer concrete facts and real-world issues.", scores: [0.2, 0.2, 0.2, 0.6] }
    ]
  },
  {
    id: 5,
    text: "I'm usually on time and well-organized.",
    options: [
      { id: "A", text: "I'm very punctual and organized in everything I do.", scores: [0.1, 0.9, 0.1, 0.2] },
      { id: "B", text: "I make an effort to stay on time and organized.", scores: [0.2, 0.8, 0.1, 0.2] },
      { id: "C", text: "I can be organized when needed but often improvise.", scores: [0.3, 0.7, 0.2, 0.2] },
      { id: "D", text: "I'm more spontaneous and less focused on structure.", scores: [0.4, 0.6, 0.2, 0.2] }
    ]
  },
  {
    id: 6,
    text: "I enjoy being in leadership or center-of-attention roles.",
    options: [
      { id: "A", text: "I love leading and being in the spotlight.", scores: [0.1, 0.1, 0.9, 0.3] },
      { id: "B", text: "I lead when needed but don't seek attention.", scores: [0.2, 0.2, 0.7, 0.2] },
      { id: "C", text: "I'm confident in groups but prefer shared attention.", scores: [0.3, 0.3, 0.6, 0.2] },
      { id: "D", text: "I prefer to stay in the background.", scores: [0.2, 0.2, 0.3, 0.8] }
    ]
  },
  {
    id: 7,
    text: "I get along well with most people, even strangers.",
    options: [
      { id: "A", text: "I easily connect with almost anyone.", scores: [0.2, 0.2, 0.2, 0.9] },
      { id: "B", text: "I'm friendly and open to new people.", scores: [0.2, 0.2, 0.3, 0.8] },
      { id: "C", text: "I'm polite but take time to warm up.", scores: [0.2, 0.2, 0.4, 0.6] },
      { id: "D", text: "I tend to keep to myself.", scores: [0.2, 0.2, 0.5, 0.5] }
    ]
  },
  {
    id: 8,
    text: "I like to explore philosophical or imaginative ideas.",
    options: [
      { id: "A", text: "I often think deeply and creatively about life.", scores: [0.9, 0.1, 0.1, 0.2] },
      { id: "B", text: "I enjoy deep thinking when I have time.", scores: [0.8, 0.2, 0.2, 0.2] },
      { id: "C", text: "I think imaginatively but prefer hands-on ideas.", scores: [0.7, 0.1, 0.3, 0.2] },
      { id: "D", text: "I don't spend much time on abstract ideas.", scores: [0.6, 0.1, 0.2, 0.3] }
    ]
  },
  {
    id: 9,
    text: "I prefer to follow rules and standards strictly.",
    options: [
      { id: "A", text: "I always follow rules and expect others to.", scores: [0.1, 0.9, 0.1, 0.2] },
      { id: "B", text: "I mostly follow rules but sometimes bend them.", scores: [0.1, 0.8, 0.2, 0.2] },
      { id: "C", text: "I follow rules only when they make sense to me.", scores: [0.1, 0.7, 0.3, 0.2] },
      { id: "D", text: "I don't like strict rules and prefer independence.", scores: [0.1, 0.6, 0.4, 0.2] }
    ]
  },
  {
    id: 10,
    text: "I'm comfortable with small talk and social gatherings.",
    options: [
      { id: "A", text: "I love socializing and meeting new people.", scores: [0.2, 0.2, 0.8, 0.3] },
      { id: "B", text: "I enjoy chatting in most group settings.", scores: [0.2, 0.2, 0.7, 0.4] },
      { id: "C", text: "I'm okay with social events but get tired quickly.", scores: [0.2, 0.2, 0.6, 0.5] },
      { id: "D", text: "I prefer quiet time and minimal social interaction.", scores: [0.2, 0.2, 0.5, 0.6] }
    ]
  }
];

// Function to determine MBTI type based on scores
const determineMBTI = (scores: number[]) => {
  // [Openness, Conscientiousness, Extraversion, Agreeableness]
  const [O, C, E, A] = scores;
  
  // Add some randomness to the thresholds to create more varied results
  const eThreshold = 0.45 + (Math.random() * 0.1); // Between 0.45 and 0.55
  const oThreshold = 0.45 + (Math.random() * 0.1);
  const aThreshold = 0.45 + (Math.random() * 0.1);
  const cThreshold = 0.45 + (Math.random() * 0.1);
  
  // Determine I/E (Introversion/Extraversion)
  const firstLetter = E > eThreshold ? "E" : "I";
  
  // Determine S/N (Sensing/iNtuition) based on Openness
  const secondLetter = O > oThreshold ? "N" : "S";
  
  // Determine T/F (Thinking/Feeling) based on Agreeableness
  const thirdLetter = A > aThreshold ? "F" : "T";
  
  // Determine J/P (Judging/Perceiving) based on Conscientiousness
  const fourthLetter = C > cThreshold ? "J" : "P";
  
  // Log the scores and thresholds for debugging
  console.log("Scores:", { O, C, E, A });
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
      // Normalize scores (divide by number of questions)
      const normalizedScores = newScores.map(score => score / questions.length);
      
      // Determine personality type
      const mbti = determineMBTI(normalizedScores);
      setPersonalityType(mbti);
      
      // Store the personality type in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('personalityType', mbti);
      }
      
      setQuizComplete(true);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-gradient-to-b from-red-400 to-red-500 min-h-screen overflow-x-hidden">
        <div className="relative w-full">
          {/* Wave-like shape at the bottom */}
          <div className="absolute bottom-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L80,106.7C160,117,320,139,480,149.3C640,160,800,160,960,138.7C1120,117,1280,75,1360,53.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 pt-20 pb-40 text-center text-white relative z-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tune Into Your Personality</h1>
            <p className="text-xl mb-8">Your traits. Your tunes.</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
            {!quizComplete ? (
              <div>
                {/* Question */}
                <h2 className="text-gray-700 text-xl sm:text-2xl font-bold text-center mb-8">
                  {questions[currentQuestion].text}
                </h2>
                
                {/* Answer options */}
                <div className=" text-gray-700 space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button key={option.id} onClick={() => handleAnswer(option.scores)}
                    className="font-semibold w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors">
                      
                      {option.text}
                    </button>
                  ))}
                </div>
                
                {/* Progress indicator */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{progress}% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Personality Type</h2>
                <div className="inline-block bg-red-100 rounded-full px-6 py-4 mb-6">
                  <h3 className="text-4xl sm:text-5xl font-bold text-red-600">{personalityType}</h3>
                </div>
                <p className="mb-6 text-gray-700">Based on your answers, we've created personalized music recommendations for you.</p>
                <Link href="/Home" className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                  See Your Music Recommendations
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}