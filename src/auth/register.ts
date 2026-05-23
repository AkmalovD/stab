export interface Register {
    name: string
    email: string
    password: string
}

// Mock register — always succeeds (no backend needed)
export async function register(name: string, email: string, _password: string) {
    return {
        user: {
            id: 'mock-user-001',
            email,
            user_metadata: { full_name: name, name },
        },
        error: null,
    }
}
