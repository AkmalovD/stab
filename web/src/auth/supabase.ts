// Mock Supabase client — no network calls, used for offline/demo mode
export const supabase = {
    auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: (_cb: unknown) => ({
            data: { subscription: { unsubscribe: () => {} } }
        }),
        signOut: async () => ({ error: null }),
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
        signUp: async () => ({ data: { user: null, session: null }, error: null }),
        resetPasswordForEmail: async () => ({ data: {}, error: null }),
    }
} as any
