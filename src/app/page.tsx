'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <style jsx global>{`
        .pixelated {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .glowing-text {
          text-shadow: 0 0 10px rgba(139, 92, 246, 0.7),
                      0 0 20px rgba(139, 92, 246, 0.5),
                      0 0 30px rgba(139, 92, 246, 0.3);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { text-shadow: 0 0 10px rgba(139, 92, 246, 0.7),
                            0 0 20px rgba(139, 92, 246, 0.5),
                            0 0 30px rgba(139, 92, 246, 0.3); }
          50% { text-shadow: 0 0 15px rgba(139, 92, 246, 0.9),
                            0 0 25px rgba(139, 92, 246, 0.7),
                            0 0 35px rgba(139, 92, 246, 0.5); }
          100% { text-shadow: 0 0 10px rgba(139, 92, 246, 0.7),
                              0 0 20px rgba(139, 92, 246, 0.5), 
                              0 0 30px rgba(139, 92, 246, 0.3); } 
        }
      `}</style>

      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-4 pixelated glowing-text">
          AI CLICKER TYCOON
        </h1>

        <p className="text-xl text-gray-300 mb-8 pixelated">
          Click. Upgrade. Dominate.
        </p>

        <div className="bg-gray-800 p-6 rounded-lg border-2 border-purple-500 mb-8">
          <p className="text-white mb-4 pixelated">
            Welcome to the ultimate AI-powered clicking experience!
          </p>
          <ul className="text-gray-300 text-left space-y-2 mb-6">
            <li className="pixelated">• Click to earn points</li>
            <li className="pixelated">• Upgrade your clicking power</li>
            <li className="pixelated">• Buy auto-clickers for passive income</li>
            <li className="pixelated">• Customize your gameplay experience</li>
            <li className="pixelated">• Get AI assistance to optimize your strategy</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="bg-purple-600 hover:bg-purple-500 text-white pixelated py-3 px-8 rounded-lg text-lg"
          >
            LOGIN
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-500 text-white pixelated py-3 px-8 rounded-lg text-lg"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  )
}