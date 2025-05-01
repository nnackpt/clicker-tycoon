import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getUserProgress(userId: string) {
    const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single()

    if (error) {
        console.error('Error fetching user progress:', error)
        return null
    }

    return data
}

export async function saveUserProgress(
    userId: string,
    totalScore: number,
    scorePerClick: number,
    bgTheme: string,
    autoClickLevel: number,
    aiAdvisor: boolean
) {
    const { data, error } = await supabase
        .from('user_progress')
        .upsert({
            user_id: userId,
            total_score: totalScore,
            score_per_click: scorePerClick,
            bg_theme: bgTheme,
            auto_click_level: autoClickLevel,
            ai_advisor: aiAdvisor,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single()
    if (error) {
        console.error('Error saving user progress:', error)
        return null
    }

    return data
}