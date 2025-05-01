import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AuthFormProps {
    mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        setError('')

        try {
            if (mode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })

                if (error) throw error
                router.push('/game')
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/game`,
                    }
                })

                if (error) throw error
                setMessage('Check your email for the confirmation link')
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleMagicLink = async () => {
        if (!email) {
            setError('Please enter your email address')
            return
        }

        setLoading(true)
        setMessage('')
        setError('')

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/game`,
                },
            })

            if (error) throw error
            setMessage('Check your email for the magic link')
        } catch (err: any) {
            setError(err.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg border-2 border-purple-500 text-white max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center pixelated">
                {mode === 'login' ? 'LOGIN' : 'SIGN UP'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm pixelated">
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2 text-sm pixelated">
                        Password
                    </label>
                    <input 
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white pixelated py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
                </button>

                <div className="text-center">
                    <span className="text-gray-400">or</span>
                </div>

                <button
                    type="button"
                    onClick={handleMagicLink}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white pixelated py-2 px-4 rounded"
                    disabled={loading}
                >
                    Login with Magic Link
                </button>
            </form>

            {message && <p className="mt-4 text-green-400 text-center pixelated">{message}</p>}
            {error && <p className="mt-4 text-red-400 text-center pixelated">{error}</p>}

            <p className="mt-6 text-center text-gray-400">
                {mode === 'login' ? "Don't have an account?" : 'Alreay have an account? '}
                <a 
                    href={mode === 'login' ? '/signup' : '/login'}
                    className="text-purple-400 hover:text-purple-300"
                >
                    {mode === 'login' ? 'Sign Up' : 'Login'}
                </a>
            </p>
        </div>
    )
}