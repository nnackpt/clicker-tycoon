import { useGame } from "@/providers/GameProvider";
import ClickButton from "./ClickButton";
import ScoreDisplay from "./ScoreDisplay";
import Shop from "./Shop";
import AutoClicker from "./AutoClicker";
import { useEffect, useState } from "react";

const bgThemes = {
    default: 'bg-gradient-to-b from-gray-900 to-gray-800',
    space: 'bg-gradient-to-b from-indigo-900 to-black bg-star-pattern',
    cyber: 'bg-gradient-to-b from-purple-900 via-blue-900 to-black bg-circuit-pattern',
    retro: 'bg-gradient-to-b from-red-900 via-purple-900 to-black bg-grid-pattern',
}

export default function GameBoard() {
    const { gameState, user } = useGame()
    const [aiMessage, setAiMessage] = useState<string | null>(null)

    useEffect(() => {
        if (gameState.aiAdvisor) {
            const messages = [
                "Try to save up for Auto-Clicer - it's efficient in the long run!",
                "The Cyberpunk theme looks great with higher level upgrades!",
                "Each click upgrade significantly increases your earning potential.",
                "Don't forget to check back often - your auto-clicker works when you're away!",
                "The more you click now, the faster you'll reah the next upgrade.",
            ]

            const showRandomTip = () => {
                const randomIndex = Math.floor(Math.random() * messages.length)
                setAiMessage(messages[randomIndex])

                setTimeout(() => {
                    setAiMessage(null)
                }, 5000)
            }

            const interval = setInterval(showRandomTip, 30000)
            showRandomTip()

            return () => clearInterval(interval)
        }
    }, [gameState.aiAdvisor])

    const bgClass = gameState.bgTheme in bgThemes
        ? bgThemes[gameState.bgTheme as keyof typeof bgThemes]
        : bgThemes.default

    return (
        <div className={`min-h-screen ${bgClass} flex flex-col items-center pt-8 px-4 relative`}>
            <style jsx global>{`
                .pixelated {
                    font-family: 'Press Start 2P', monospace;
                    image-rendering: pixelated;
                }

                .bg-star-pattern {
                    background-image: radial-gradient(white 1px, transparent 1px);
                    background-size: 50px 50px;
                }

                .bg-circuit-pattern {
                    background-image: linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }

                .bg-grid-pattern {
                    background-image: linear-gradient(rgba(255, 0, 255, 0.2) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255, 0, 255, 0.2) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                
                .animate-float {
                    animation: float 1s ease-out forwards;
                }

                @keyframes float {
                    0% {
                        opacity: 1;
                        transform: translate(-50%, -50%) translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) translateY(-40px);
                    }
                }
            `}</style>

            <h1 className="text-3xl font-bold text-center text-white mb-4 pixelated">AI CLICKER TYCOON</h1>

            {user ? (
                <>
                    <ScoreDisplay />

                    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
                        <div className="flex flex-col items-center">
                            <ClickButton />
                        </div>

                        <Shop />
                    </div>

                    <AutoClicker />

                    {aiMessage && (
                        <div className="fixed bottom-4 left-4 max-w-xs bg-blue-900 p-3 rounded-lg border-2 border-blue-500 text-white animate-fade-in">
                            <div className="text-xs text-blue-300 pixelated mb-1">AI ADVISOR:</div>
                            <div className="text-sm pixelated">{aiMessage}</div>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-gray-800 p-6 rounded-lg border-2 border-purple-500 text-white">
                    <p className="pixelated text-center mb-4">Please login to play!</p>
                    <a href="/login" className="block bg-purple-600 hover:bg-purple-500 text-white pixelated py-2 px-4 rounded text-center">
                        Login
                    </a>
                </div>
            )}
        </div>
    )
}