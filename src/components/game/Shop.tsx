import { useState } from "react";
import { useGame } from "@/providers/GameProvider";
import { UpgradeItem } from "@/lib/types";

const clickUpgrades: UpgradeItem[] = [
    {
        id: 'click-1',
        name: 'Upgrade Click (Lv.1)',
        description: '+1 score per click',
        price: 50,
        level: 1,
        category: 'click',
        effect: (state) => ({
            ...state,
            scorePerClick: state.scorePerClick + 1,
        }),
        canPurchase: (state) => state.scorePerClick === 1,
    },
    {
        id: 'click-2',
        name: 'Upgrade Click (Lv.2)',
        description: '+2 score per click',
        price: 200,
        level: 2,
        category: 'click',
        effect: (state) => ({
            ...state,
            scorePerClick: state.scorePerClick + 2,
        }),
        canPurchase: (state) => state.scorePerClick === 2,
    },
    {
        id: 'click-3',
        name: 'Upgrade Click (Lv.3)',
        description: '+5 score per click',
        price: 500,
        level: 3,
        category: 'click',
        effect: (state) => ({
            ...state,
            scorePerClick: state.scorePerClick + 5,
        }),
        canPurchase: (state) => state.scorePerClick === 4,
    },
]

const backgroundUpgrades: UpgradeItem[] = [
    {
        id: 'bg-space',
        name: 'Change BG: Space',
        description: 'Space theme background',
        price: 100,
        level: 1,
        category: 'background',
        effect: (state) => ({
            ...state,
            bgTheme: 'space',
        }),
        canPurchase: (state) => state.bgTheme !== 'space',
    },
    {
        id: 'bg-cyber',
        name: 'Change BG: Cyberpunk',
        description: 'Cyberpunk theme background',
        price: 150,
        level: 1,
        category: 'background',
        effect: (state) => ({
            ...state,
            bgTheme: 'cyber',
        }),
        canPurchase: (state) => state.bgTheme !== 'cyber',
    },
    {
        id: 'bg-retro',
        name: 'Change BG: Retro',
        description: 'Retro arcade theme background',
        price: 200,
        level: 1,
        category: 'background',
        effect: (state) => ({
            ...state,
            bgTheme: 'retro',
        }),
        canPurchase: (state) => state.bgTheme !== 'retro',
    },
]

const autoUpgrades: UpgradeItem[] = [
    {
        id: 'auto-click',
        name: 'Auto Clicker',
        description: 'Automatically adds 1 score every 5 seconds',
        price: 500,
        level: 1,
        category: 'auto',
        effect: (state) => ({
            ...state,
            autoClickLevel: 1,
        }),
        canPurchase: (state) => state.autoClickLevel === 0,
    },
    {
        id: 'auto-click-2',
        name: 'Auto Clicker Lv.2',
        description: 'Automatically adds 2 scores every 5 seconds',
        price: 1200,
        level: 2,
        category: 'auto',
        effect: (state) => ({
            ...state,
            autoClickLevel: 2,
        }),
        canPurchase: (state) => state.autoClickLevel === 1,
    },
]

const aiUpgrades: UpgradeItem[] = [
    {
        id: 'ai-advisor',
        name: 'AI Advisor',
        description: 'Get helpful tips from an AI assistant',
        price: 300,
        level: 1,
        category: 'ai',
        effect: (state) => ({
            ...state,
            aiAdvisor: true,
        }),
        canPurchase: (state) => !state.aiAdvisor,
    }
]

export default function Shop() {
    const { gameState, buyUpgrade } = useGame()
    const [activeTab, setActiveTab] = useState<string>('click')

    const allUpgrades = {
        click: clickUpgrades,
        background: backgroundUpgrades,
        auto: autoUpgrades,
        ai: aiUpgrades,
    }

    const tabs = [
        { id: 'click', label: 'Click Upgrades' },
        { id: 'background', label: 'Themes' },
        { id: 'auto', label: 'Auto' },
        { id: 'ai', label: 'AI' },
    ]

    return (
        <div className="bg-gray-800 p-4 rounded-lg border-2 border-purple-500 text-white w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center pixelated">SHOP</h2>

            <div className="flex mb-4 pixelated space-x-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`flex-1 py-1 px-2 ${activeTab === tab.id ? 'bg-purple-600' : 'bg-gray-700'} rounded`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                {allUpgrades[activeTab as keyof typeof allUpgrades].map((item) => {
                    const canAfford = gameState.score >= item.price
                    const canPurchase = item.canPurchase(gameState)
                    const isDisabled = !canAfford || !canPurchase

                    return (
                        <div
                            key={item.id}
                            className={`border p-2 rounded flex justify-between items-center ${
                                isDisabled ? 'border-gray-600 opacity-50' : 'border-green-500'
                            }`}
                        >
                            <div>
                                <div className="font-bold pixelated">{item.name}</div>
                                <div className="text-xs text-gray-300">{item.description}</div>
                            </div>
                            <button
                                className={`px-2 py-1 rounded pixelated ${
                                    isDisabled ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'
                                }`}
                                onClick={() => buyUpgrade(item)}
                                disabled={isDisabled}
                            >
                                {item.price} 💰
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}