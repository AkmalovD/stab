'use client'

import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

import { getAccessToken } from '@/lib/authTokens'
import { authApi, type AuthUser } from '@/services/authApi'

interface SessionUser {
    id: string
    email: string
    user_metadata: {
        full_name: string
        name: string
        avatar_url: string | null
    }
    app_metadata: Record<string, unknown>
    aud: string
    created_at: string
}

interface AuthContextType {
    user: SessionUser | null
    loading: boolean
    login: (email: string, password: string, rememberMe?: boolean) => Promise<{ user: SessionUser | null; error: string | null }>
    register: (name: string, email: string, password: string) => Promise<{ user: SessionUser | null; error: string | null }>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

function mapUser(user: AuthUser): SessionUser {
    const displayName = user.displayName ?? ''
    return {
        id: user.id,
        email: user.email,
        user_metadata: {
            full_name: displayName,
            name: displayName,
            avatar_url: user.avatarUrl ?? null,
        },
        app_metadata: {},
        aud: 'authenticated',
        created_at: user.createdAt,
    }
}

function extractError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        if (Array.isArray(message)) return message[0]
        if (typeof message === 'string') return message
    }
    return 'Something went wrong. Please try again.'
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SessionUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const restore = async () => {
            if (!getAccessToken()) {
                setLoading(false)
                return
            }

            try {
                const me = await authApi.me()
                setUser(mapUser(me))
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        restore()
    }, [])

    const login = async (email: string, password: string, rememberMe = false) => {
        try {
            const loggedIn = mapUser(await authApi.login(email, password, rememberMe))
            setUser(loggedIn)
            return { user: loggedIn, error: null }
        } catch (error) {
            return { user: null, error: extractError(error) }
        }
    }

    const register = async (name: string, email: string, password: string) => {
        try {
            const created = mapUser(await authApi.register(name, email, password))
            setUser(created)
            return { user: created, error: null }
        } catch (error) {
            return { user: null, error: extractError(error) }
        }
    }

    const logout = async () => {
        await authApi.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
