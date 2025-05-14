import Link from 'next/link'

export default function ProfileCard() {
  const traits = [
    { letter: 'I', label: 'Introvert' },
    { letter: 'N', label: 'Intuitive' },
    { letter: 'F', label: 'Feeling' },
    { letter: 'J', label: 'Judging' },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            INFJ Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            The Advocate
          </p>
        </div>
        <Link
          href="/profile/infj"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium inline-flex items-center"
        >
          Explore Deeper
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {traits.map(({ letter, label }) => (
          <div
            key={letter}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 flex flex-col items-center"
          >
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {letter}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 