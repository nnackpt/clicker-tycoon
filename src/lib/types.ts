export interface User {
    id: string
    email: string
}

export interface GameState {
    score: number
    scorePerClick: number
    autoClickLevel: number
    autoClickInterval: number | null
    bgTheme: string
    aiAdvisor: boolean
}

export interface UpgradeItem {
    id: string
    name: string
    description: string
    price: number
    level: number
    maxLevel? : number
    effect: (state: GameState) => GameState
    category: 'click' | 'background' | 'auto' | 'ai'
    canPurchase: (state: GameState) => boolean
}

export interface UserProgress {
    id: string
    user_id: string
    total_score: number
    score_per_click: number
    bg_theme: string
    auto_click_level: number
    ai_advisor: boolean
    created_at?: string
    updated_at?: string
}