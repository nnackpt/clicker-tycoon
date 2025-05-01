import { useState, useEffect } from "react";
import { useGame } from "@/providers/GameProvider";

export default function ClickButton() {
    const { gameState, handleClick } = useGame()
    const [isAnimating, setIsAnimating] = useState(false)
    const [popups, setPopups] = useState<Array<{ id: number; value: number; x: number; y: number }>>([])
    const [popupId, setPopupId] = useState(0)

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        handleClick()
        setIsAnimating(true)

        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const newPopup = {
            id: popupId,
            value: gameState.scorePerClick,
            x,
            y,
        }

        setPopups(prev => [...prev, newPopup])
        setPopupId(prev => prev + 1)

        setTimeout(() => {
            setPopups(prev => prev.filter(popup => popup.id !== newPopup.id))
        }, 1000)
    }

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [isAnimating])

    return (
        <div className="relative flex justify-center items-center w-48 h-48">
            {popups.map((popup) => (
                <div
                    key={popup.id}
                    className="absolute text-yellow-300 font-bold text-xl pointer-events-none animate-float z-10 pixelated"
                    style={{
                        left: `${popup.x}px`,
                        top: `${popup.y}px`,
                        transform: 'translate(-50%, -50%',
                    }}
                >
                    +{popup.value}
                </div>
            ))}

            <button
                onClick={handleButtonClick}
                className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600
                    shadow-lg transform transition-transform pixelated
                    border-4 border-blue-300 focus:outline-none
                    ${isAnimating ? 'scale-95' : 'hover:scale-105'}`}
            >
                <div className="text-white font-bold text-xl pixelated">CLICK</div>
            </button>
        </div>
    )
}