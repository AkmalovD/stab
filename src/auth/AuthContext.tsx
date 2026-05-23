'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const MOCK_USER = {
    id: 'mock-user-001',
    email: 'demo@stab.app',
    user_metadata: {
        full_name: 'Alex Johnson',
        name: 'Alex Johnson',
        avatar_url: null as string | null,
    },
    app_metadata: {},
    aud: 'authenticated',
    created_at: '2024-01-01T00:00:00.000Z',
}

type MockUser = typeof MOCK_USER

const AUTH_KEY = 'stab_mock_auth'

interface AuthContextType {
    user: MockUser | null
    loading: boolean
    login: (email: string, password: string, rememberMe?: boolean) => Promise<{ user: MockUser | null; error: string | null }>
    register: (name: string, email: string, password: string) => Promise<{ user: MockUser | null; error: string | null }>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<MockUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(AUTH_KEY)
            if (stored) {
                setUser(JSON.parse(stored))
            } else {
                // Auto-login with mock user by default for demo
                localStorage.setItem(AUTH_KEY, JSON.stringify(MOCK_USER))
                setUser(MOCK_USER)
            }
        } catch {
            setUser(MOCK_USER)
        }
        setLoading(false)
    }, [])

    const login = async (email: string, _password: string, _rememberMe = false) => {
        const loggedInUser: MockUser = { ...MOCK_USER, email }
        localStorage.setItem(AUTH_KEY, JSON.stringify(loggedInUser))
        setUser(loggedInUser)
        return { user: loggedInUser, error: null }
    }

    const register = async (name: string, email: string, _password: string) => {
        const newUser: MockUser = {
            ...MOCK_USER,
            email,
            user_metadata: { ...MOCK_USER.user_metadata, full_name: name, name },
        }
        localStorage.setItem(AUTH_KEY, JSON.stringify(newUser))
        setUser(newUser)
        return { user: newUser, error: null }
    }

    const logout = async () => {
        localStorage.removeItem(AUTH_KEY)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
