import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { getUserProgress, saveUserProgress } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })

    try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userId = session.user.id
        const progress = await getUserProgress(userId)

        if (!progress || progress.auto_click_level === 0) {
            return NextResponse.json({ error: 'No auto-clicker available' }, { status: 400 })
        }

        const updatedProgress = await saveUserProgress(
            userId,
            progress.total_score + progress.auto_click_level,
            progress.score_per_click,
            progress.bg_theme,
            progress.auto_click_level,
            progress.ai_advisor
        )

        return NextResponse.json({ success: true, score: updatedProgress?.total_score })
    } catch (error) {
        console.error('Auto-click error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}