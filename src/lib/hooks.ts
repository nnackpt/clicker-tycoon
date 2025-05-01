import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue
        }

        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    const setValue = (value: T) => {
        try {
            setStoredValue(value)
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue]
}

export function useInterval(callback: () => void, delay: number | null) {
    useEffect(() => {
        if (delay === null) {
            return
        }

        const id = setInterval(callback, delay)
        return () => clearInterval(id)
    }, [callback, delay])
}