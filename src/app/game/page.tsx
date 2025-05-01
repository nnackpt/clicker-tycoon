'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import GameBoard from "@/components/game/GameBoard"
import { GameProvider } from "@/providers/GameProvider"

export default function GamePage() {
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            if (!data.session) {
                router.push('/login')
            }
        }

        checkSession()
    }, [router])

    return (
        <GameProvider>
            <GameBoard />
        </GameProvider>
    )
}