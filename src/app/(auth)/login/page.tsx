'use client'

import AuthForm from "@/components/auth/AuthForm"

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-white mb-8 pixelated">AI CLICKER TYCOON</h1>
                <AuthForm mode="login" />
            </div>
        </div>
    )
}