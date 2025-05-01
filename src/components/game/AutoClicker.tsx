import { useEffect, useState } from "react";
import { useGame } from "@/providers/GameProvider";

export default function AutoClicker() {
    const { gameState } = useGame()
    const [timeLeft, setTimeLeft] = useState(5)

    useEffect(() => {
        if (gameState.autoClickLevel > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        return 5
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [gameState.autoClickLevel])

    if (gameState.autoClickLevel === 0) {
        return null
    }

    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 p-2 rounded-lg border-2 border-blue-500">
            <div className="text-xs text-blue-300 pixelated">Auto-Clicker</div>
            <div className="flex items-center">
                <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-blue-500 h-full transition-full duration-1000 ease-linear"
                        style={{ width: `${(timeLeft / 5) * 100}%` }}
                    />
                </div>
                <span className="ml-2 text-white pixelated">{timeLeft}s</span>
            </div>
        </div>
    )
}