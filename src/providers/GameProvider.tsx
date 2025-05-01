import { createContext, useContext, useEffect, useState } from "react";
import { GameState, User, UpgradeItem } from "@/lib/types";
import { getUserProgress, saveUserProgress, supabase } from "@/lib/supabase";

interface GameContextType {
    gameState: GameState
    user: User | null
    handleClick: () => void
    buyUpgrade: (item: UpgradeItem) => void
    saveProgress: () => Promise<void>
}

const initialGameState: GameState = {
    score: 0,
    scorePerClick: 1,
    autoClickLevel: 0,
    autoClickInterval: null,
    bgTheme: 'default',
    aiAdvisor: false,
}

const GameContext = createContext<GameContextType>({
    gameState: initialGameState,
    user: null,
    handleClick: () => {},
    buyUpgrade: () => {},
    saveProgress: async () => {}
})

export function useGame() {
    return useContext(GameContext)
}

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<GameState>(initialGameState)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                })
                const progress = await getUserProgress(session.user.id)
                if (progress) {
                    setGameState({
                        score: progress.total_score,
                        scorePerClick: progress.score_per_click,
                        autoClickLevel: progress.auto_click_level,
                        autoClickInterval: progress.auto_click_level > 0 ? setInterval(() => {
                            setGameState(prev => ({
                                ...prev,
                                score: prev.score + prev.autoClickLevel,
                            }))
                        }, 5000) : null,
                        bgTheme: progress.bg_theme,
                        aiAdvisor: progress.ai_advisor,
                    })
                }
            } else {
                setUser(null)
                setGameState(initialGameState)
            }
            setLoading(false)
        })

        return () => {
            authListener.subscription.unsubscribe()
            if (gameState.autoClickInterval) {
                clearInterval(gameState.autoClickInterval)
            }
        }
    }, [])

    useEffect(() => {
        if (gameState.autoClickLevel > 0 && !gameState.autoClickInterval) {
            const interval = setInterval(() => {
                setGameState(prev => ({
                    ...prev,
                    score: prev.score + prev.autoClickLevel,
                }))
            }, 5000)

            setGameState(prev => ({
                ...prev,
                autoClickInterval: interval,
            }))

            return () => clearInterval(interval)
        }
    }, [gameState.autoClickLevel])

    const handleClick = () => {
        setGameState(prev => ({
            ...prev,
            score: prev.score + prev.scorePerClick,
        }))
    }

    const buyUpgrade = (item: UpgradeItem) => {
        if (gameState.score >= item.price && item.canPurchase(gameState)) {
            const newState = item.effect({
                ...gameState,
                score: gameState.score - item.price,
            })
            setGameState(newState)
            saveProgress()
        }
    }

    const saveProgress = async () => {
        if (user) {
            await saveUserProgress(
                user.id,
                gameState.score,
                gameState.scorePerClick,
                gameState.bgTheme,
                gameState.autoClickLevel,
                gameState.aiAdvisor
            )
        }
    }

    useEffect(() => {
        if (user && !loading) {
            const saveInterval = setInterval(saveProgress, 30000)
            return () => clearInterval(saveInterval)
        }
    }, [user, loading, gameState])

    return (
        <GameContext.Provider value={{ gameState, user, handleClick, buyUpgrade, saveProgress }}>
            {!loading && children}
        </GameContext.Provider>
    )
}