'use client'

export interface Login {
    email: string
    password: string
}

// Mock login — always succeeds (no backend needed)
export async function login(email: string, _password: string, _rememberMe = false) {
    return { user: { id: 'mock-user-001', email }, error: null }
}
