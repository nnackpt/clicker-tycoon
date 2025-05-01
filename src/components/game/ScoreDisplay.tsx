import { useGame } from "@/providers/GameProvider";

export default function ScoreDisplay() {
    const { gameState } = useGame()

    return (
        <div className="bg-gray-800 p-4 rounded-lg border-2 border-purple-500 text-white mb-6 w-full max-w-md">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-xs text-gray-400">TOTAL SCORE</div>
                    <div className="text-3xl font-bold text-yellow-300 pixelated">{gameState.score}</div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-1">PER CLICK:</span>
                        <span className="text-lg font-bold text-green-400 pixelated">+{gameState.scorePerClick}</span>
                    </div>

                    {gameState.autoClickLevel > 0 && (
                        <div className="flex items-center">
                            <span className="text-xs text-gray-400 mr-1">AUTO:</span>
                            <span className="text-lg font-bold text-blue-400 pixelated">+{gameState.autoClickLevel}/5s</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}